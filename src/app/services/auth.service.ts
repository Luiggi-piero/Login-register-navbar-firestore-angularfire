import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';

// Angularfire
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'; // CRUD
import firebase from 'firebase/app';

import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private usuarioToken: string | null = '';
  private administrador: boolean = false;
  private cliente: boolean = false;
  
  constructor( public firestore: AngularFirestore, public auth: AngularFireAuth ) { 
    this.leerToken();
  } 

  agregarCliente(cliente: any, id: string){
    // return this.firestore.collection('clientes').add(cliente);
    return this.firestore.collection('clientes').doc(id).set(cliente);
  }

  getClientes(): Observable<any>{
    return this.firestore.collection('clientes', ref => ref.orderBy('name','asc')).snapshotChanges();
  }

  getAdministradores(){
    return this.firestore.collection('administradores').snapshotChanges();
  }

  esAdministrador(): boolean{
    return this.administrador;
  }

  esCliente(): boolean{
    return this.cliente;
  }

  login(usuario: UsuarioModel){

    //********************************/
    // Verifica si es administrador
    //********************************/
    this.getAdministradores().subscribe( data => {
      data.forEach((a: any) => {
        if(a.payload._delegate.doc.data().email === usuario.email
         && a.payload._delegate.doc.data().password === usuario.password){
          console.log('admin verificado', a.payload._delegate.doc.data().email);
          this.administrador = true;
          this.cliente = false;
        }
        else{
          this.administrador = false;
          this.cliente = true;
          console.log('NO es administrador, es cliente');
        } 
      });
    })

    // *****************************
    // Verifica el inicio de sesion
    // *****************************
    return this.auth.signInWithEmailAndPassword(usuario.email, usuario.password)
                      .then( resp => {
                        firebase.auth().currentUser.getIdToken(true).then(idToken => this.guardarToken(idToken));
                        return resp;
                      } ); 
  }
  

  nuevoUsuario( usuario: UsuarioModel ) {
    this.cliente = true;
    return this.auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
          .then((resp)=> {
            // Asigna nombre del usuario a firebase
            resp.user.updateProfile({displayName: usuario.nombre});
            // Recupera y guarda el idToken del usuario antes de enviar la resp
            firebase.auth().currentUser.getIdToken(true).then(idToken => this.guardarToken(idToken));
            console.log('usuario registrado =>', resp.user);
            return resp;
          })
  }


  guardarToken( idToken: string ){
    this.usuarioToken = idToken;
    localStorage.setItem( 'token', idToken );
  }


  leerToken(){
    if( localStorage.getItem('token') ){
      this.usuarioToken = localStorage.getItem('token');
    }else{
      this.usuarioToken = '';
    }
    return this.usuarioToken;
  }


  estaAutenticado(): boolean{
    return this.usuarioToken.length > 2;
  }

  logOut(){
    //seteo a falso de administrador y cliente (no es ni cliente ni administrador)
    this.administrador = false;
    this.cliente = false;
    localStorage.removeItem('token');
    this.leerToken();
  }
}
