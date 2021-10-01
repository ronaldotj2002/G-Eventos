import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    public authentication: AuthenticationService,
    private router: Router) { }

    canActivate(): boolean {
      if(!this.authentication.estaAutenticado()) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
}
