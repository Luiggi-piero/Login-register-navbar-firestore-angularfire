import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProtegidaComponent } from './components/protegida/protegida.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { ProductsComponent } from './components/products/products.component';
import { OffersComponent } from './components/offers/offers.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { MyShoppingComponent } from './components/my-shopping/my-shopping.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { AuthClienteGuard } from './guards/auth-cliente.guard';

const routes: Routes = [
  {path: 'home'     , component: HomeComponent},
  {path: 'login'    , component: LoginComponent},
  {path: 'registro' , component: RegistroComponent},
  {path: 'products' , component: ProductsComponent},
  {path: 'offers'   , component: OffersComponent},
  {path: 'myCart'   , component: MyCartComponent},
  {path: 'myShopping'   , component: MyShoppingComponent},
  // {path: 'administrador' , component: AdministradorComponent, canActivate:[AuthGuard, AuthAdminGuard]},
  // {path: 'protegida', component: ProtegidaComponent, canActivate:[AuthGuard, AuthClienteGuard]},
  {path: '**'       , pathMatch: 'full', redirectTo:'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
