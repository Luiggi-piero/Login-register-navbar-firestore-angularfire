import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';  
 
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ProtegidaComponent } from './components/protegida/protegida.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { ProductsComponent } from './components/products/products.component';
import { OffersComponent } from './components/offers/offers.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { MyShoppingComponent } from './components/my-shopping/my-shopping.component';

// Angularfire
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFirestore } from '@angular/fire/firestore';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    ProtegidaComponent,
    AdministradorComponent,
    ProductsComponent,
    OffersComponent,
    MyCartComponent,
    MyShoppingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    // AngularFireModule,
    // AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
