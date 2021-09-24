import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // formularioBuscar !: FormGroup;
  flag: boolean = false; // Colapsa el menu (click sobre el toggle)
  clickUserMenu: boolean = false;

  windowWidth: number;
  // anchoVentana: number = screen.width;

  constructor( private auth: AuthService) {  }

  ngOnInit(): void {  
    this.windowWidth = screen.width;
  }

  showUserMenu(){
    this.clickUserMenu = !this.clickUserMenu;
    // console.log('click en user menu', this.clickUserMenu);
  }
  
  // Escucha el cambio del tamanio de la pantalla
  onResize(e){
    // console.log(e.target.innerWidth);
    this.windowWidth = e.target.innerWidth;
        
    if (this.windowWidth >= 750) {
      // console.log('mayor o igual a 750px');
      this.flag = false; 
    }
  }

  // Evento al tocar el boton toogle
  toggleEvent(){
    this.flag = !this.flag;
  }

  autenticado(){
    return this.auth.estaAutenticado();
  }

  mostrarAdmin(): boolean{
    return this.auth.esAdministrador();
  }

  salir(){
    this.auth.logOut();
  }

  funcion(){
    console.log("buscando...");
  }


}
