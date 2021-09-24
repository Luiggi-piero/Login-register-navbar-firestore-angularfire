import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  usuario             : UsuarioModel = new UsuarioModel();
  formularioRegistro !: FormGroup;
  recordarme          : boolean = false;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private router: Router) { // Para navegar al home una vez registrado 
    this.crearFormularioRegistro();
    this.crearListenersRegistro(['email', 'nombre', 'password']);
  }
  

  ngOnInit(): void {
  }  

  crearFormularioRegistro(){
    this.formularioRegistro = this.fb.group({
      email         : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
      nombre        : ['', [ Validators.required ]],
      password      : ['', [ Validators.required, Validators.minLength(6) ]],
      checkRecordar1: ['']
    })
  }

  campoNoValido(campo: string){
    return this.formularioRegistro.get(campo)?.invalid && this.formularioRegistro.get(campo)?.touched;
  }

  crearListenersRegistro(campos: string[]){
    campos.forEach( campo => {
      this.formularioRegistro.get(campo)?.valueChanges.subscribe( e =>{
        this.usuario[campo] = e;
      })
    })    
  }

  onSubmit(){

    //************************************************************/
    //Creacion de usuario temporal para llamadas AngularFirestore
    //************************************************************/
    var usuarioTemporal  = {
      name : this.usuario.nombre,
      email : this.usuario.email
    }

    //*************************************/
    //Capturando el estado del recordarme
    //*************************************/
    this.recordarme = this.formularioRegistro.get('checkRecordar1').value;

    // Formulario invalido
    if(this.formularioRegistro.invalid){
      this.formularioRegistro.markAllAsTouched();
      return;
    }
    //*******************************/
    // Todo valido sobre el formulario
    // notificacion de cargando
    //*******************************/

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor',
      icon: 'info',
    });
    // Simular loading
    Swal.showLoading(); 
    
    //****************************************************** */
    // Se realiza la peticion al registro por correo y pass
    //****************************************************** */
    
    // Se crea el usuario
    this.auth.nuevoUsuario( this.usuario )
    .then( (resp) => {

      //Creacion del cliente en la coleccion CLIENTES
      this.auth.agregarCliente(usuarioTemporal, resp.user.uid).then( () => {
      console.log('cliente registrado');
      }).catch( error => {
        console.log(error);
      });

      // Cerrar loading
      Swal.close(); 
      console.log('Respuesta del Registro', resp.user.uid);
      // si esta activo el recordarme se Guarda el email en localstorage 
      if( this.recordarme ){
        localStorage.setItem('email', this.usuario.email);
      }

      // Navega al home, el nuevo usuario fue creado
      this.router.navigateByUrl('/home');
    })
    .catch( err => {// Captura y Muestra el error
        Swal.fire({
          title: 'La cuenta está en uso, ingrese otra por favor',
          text : err.message,
          icon : 'error',
        });
    })
    // **********************
    // .subscribe( resp => {
    //   // Se crea el usuario
    //   console.log(resp);
    //   Swal.close(); // Cerrar loading

    //   // si esta activo el recordarme se Guarda el email en localstorage 
    //   if( this.recordarme ){
    //     localStorage.setItem('email', this.usuario.email);
    //   }

    //   // Navega al home, el nuevo usuario fue creado
    //   this.router.navigateByUrl('/home');
    // }, (err) => { // Captura y Muestra el error
    //   console.log(err.error.error.message);
    //   Swal.fire({
    //     title: err.error.error.message,
    //     text : 'La cuenta está en uso, ingrese otra por favor',
    //     icon : 'error',
    //   });
    // })
  }
}
