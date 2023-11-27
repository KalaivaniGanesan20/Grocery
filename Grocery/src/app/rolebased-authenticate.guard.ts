import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RolebasedAuthenticateGuard implements CanActivate {
  constructor(private service:AuthserviceService,private route:Router){}
  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean
    {
      let token:any=localStorage.getItem("Token");
      let jwtData = token.split('.')[1]
      let decodedJwtJsonData =atob(jwtData)
      let decodedJwtData = JSON.stringify(decodedJwtJsonData)
      let isAdmin = decodedJwtData.includes(router.data['role'])
      // console.log('jwtData: ' + jwtData)
      // console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
      // console.log('decodedJwtData: ' + decodedJwtData)

      // let isAdmin=this.service.getRole();

     console.log('Is admin: ' + isAdmin)

      if(isAdmin===true)
      {
        return true;
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Access Denied...',
        })
        this.route.navigate(["Home"]); //localhost:4200/login?retUrl=product
        return false;
      }
    }

}
