import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthserviceService } from './authservice.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private service:AuthserviceService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean
    {

       if(this.service.loggedin())
       {
        return true;
        }
        else{
          Swal.fire({
            icon: 'warning',
            title: "Can't view this page ...",
            text: 'Login to View!',
          })
          this.router.navigate(["Login"],{queryParams:{retUrl:route.url}}); //localhost:4200/login?retUrl=product
          return false;
        }
    }
  }
