import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    const token = localStorage.getItem('token') as string;
    if (!token){
      this.router.navigate(['/register/signin']);
      return false;
    }

    // decode the token to get its payload
    const tokenPayload: any = jwt_decode(token) || "";

    if (
     !this.auth.isLoggedIn()
      
      //|| tokenPayload.role !== expectedRole
    ) {

      this.router.navigate(['/register/signin']);
      return false;
    }
    return true;
  }

}
