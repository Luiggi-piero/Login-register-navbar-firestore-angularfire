import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin !: FormGroup;
  usuario          : UsuarioModel = new UsuarioModel();
  recordarme       : boolean = false;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private router: Router ) { 
    this.crearFormularioLogin();
    this.crearListenersLogin();
    this.estadoRecordarme(this.recordarme);
  }

  ngOnInit(): void {
    if( localStorage.getItem('email') ){
      // Actualiza email del usuario: UsuarioModel
      this.usuario.email = localStorage.getItem('email');
      // Actualiza email del campo del formulario
      this.formularioLogin.get('email').reset(this.usuario.email);
      // Actualiza el estado de recordarme
      this.recordarme = true;
      this.estadoRecordarme(this.recordarme);
    }
  }

  crearFormularioLogin(){
    this.formularioLogin = this.fb.group({
      email        : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password     : ['', [Validators.required, Validators.minLength(6)]],
      checkRecordar: ['']
    })
  }

  estadoRecordarme(estado: boolean){
    this.formularioLogin.get('checkRecordar').reset(estado);
  }

  crearListenersLogin(){
    this.listenEmail();
    this.listenPassword();
  }

  listenEmail(){
    this.formularioLogin.get('email')?.valueChanges.subscribe( e => {
      this.usuario.email = e;
    } )
  }
  
  listenPassword(){
    this.formularioLogin.get('password')?.valueChanges.subscribe( e => {
      this.usuario.password = e;
    } )
  }

  campoNoValido(campo: string){
    return this.formularioLogin.get(campo)?.invalid && this.formularioLogin.get(campo)?.touched;
  }

  login(){
    // console.log(this.formularioLogin);
    // console.log(this.usuario);
    
    // Actualiza valor del recordarme
    this.recordarme = this.formularioLogin.get('checkRecordar').value;

    // Formulario es invalido
    if(this.formularioLogin.invalid){
      this.formularioLogin.markAllAsTouched();
      return;
    }

    // Todo valido sobre el formulario
    // notificacion de cargando
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor',
      icon: 'info',
      // showClass: {
      //     popup: 'animate__animated animate__fadeInDown'
      // },
      // hideClass: {
      //     popup: 'animate__animated animate__fadeOutUp'
      // }
    });
    
    Swal.showLoading(); // Simular loading

    // Se realiza la peticion

    this.auth.login( this.usuario )
    .then( resp => {
      // Se autentico al usuario
      console.log(resp);
      Swal.close(); // Cierra el loading

      // si esta activo el recordarme se Guarda el email en localstorage 
      if( this.recordarme ){
        localStorage.setItem('email', this.usuario.email);
      }else{// Eliminar email del localstorage
        localStorage.removeItem('email');
      }

      // Navega al home 
      this.router.navigateByUrl('/home');
    })
    .catch( err => { // Captura y muestra el error por pantalla
      console.log(err.message);
      Swal.fire({
        title: 'Ingrese una cuenta válida por favor',
        text : err.message,
        icon : 'error',
        // showClass: {
        //     popup: 'animate__animated animate__fadeInDown'
        // },
        // hideClass: {
        //     popup: 'animate__animated animate__fadeOutUp'
        // }
      });
    })

  }
}
