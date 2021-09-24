import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Servicios
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthClienteGuard implements CanActivate {
  
  constructor(private auth: AuthService,
              private router: Router){  }

  canActivate(): boolean {
    if (this.auth.esCliente()) {
      return true;
    }
    else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
}
