import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clientes: any[] = [];
  administradores: any[] = [];

  constructor(private firestore: AuthService) { 
  }
  
  
  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerAdministradores();
  }

  obtenerClientes(){
    this.clientes = []; 
    setTimeout(() => {
      this.firestore.getClientes().subscribe( (data: any) => {
        data.forEach((cliente: any) => {
          this.clientes.push({
            id: cliente.payload.doc.id,
            ...cliente.payload._delegate.doc.data()
          });
          // console.log(cliente.payload.doc.id);
          // console.log(cliente.payload._delegate.doc.data());
          // console.log(cliente.payload._delegate.doc._document.data.value.mapValue.fields);
        });
      }); 
    }, 1600);

    console.log(this.clientes);
  }

  obtenerAdministradores(){
    this.firestore.getAdministradores().subscribe( (data: any) => {
      data.forEach( (admin: any) => {
        this.administradores.push({
          id: admin.payload.doc.id,
          ...admin.payload._delegate.doc.data()
        })
      })
    })
  }
}
