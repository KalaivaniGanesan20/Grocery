import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProductserviceService } from './productservice.service';
import { User } from './Datatype';
import { LoggerService } from './Logger.service';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthserviceService {

userpayload:any;
isloggedin:any;
isadmin:any;
userRole:any;
body:any;

//const urls from environment.ts

userurl=environment.user;


httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': ' application/json-patch+json'
  })
}
    constructor(private route:Router,private http:HttpClient,private productservice:ProductserviceService,private mylogger:LoggerService)
     {
     }

     getAllUser()
     {
       return this.http.get(this.userurl);
     }

   login(LoginForm:any,retUrl:any)
   {
    this.http.post(this.userurl+'/Login',JSON.stringify(LoginForm.value),this.httpOptions).subscribe((result:any)=>{
          this.storeToken(result.message);
          const payload=JSON.parse(atob(result.message.split('.')[1]))
          this.http.get<User|any>(this.userurl,this.httpOptions).subscribe(res=>{
            const myuser=res.find((a:User)=>{
              return a.emailid===LoginForm.value.emailid && a.password===LoginForm.value.password;
            });
          if(myuser)
          {

             this.userRole=this.getRole();
             if(this.userRole===true)
             {
              localStorage.setItem('isadmin','true');
             }
            localStorage.setItem('user',JSON.stringify(myuser));
            localStorage.setItem('loggedin','true');
            this.isloggedin=localStorage.getItem('loggedin');
              Swal.fire({
              icon: 'success',
              title: 'Logged in ...',
              text: result.status,
            })

            // logging looged in user data  with date

            this.mylogger.log(myuser.firstname +" is  loggedin with emailid "+ myuser.emailid);

            //return url from where the user is redirected to loginpage

            if(retUrl!=null){
              this.route.navigate([retUrl]);
            }
            else{
              this.route.navigate(["Home"]);
            }
          }
        }) });
   }
   logout()
   {

    localStorage.setItem('isadmin','false');
    this.isadmin=localStorage.getItem('isadmin');
    this.route.navigate(['Home']);
    localStorage.removeItem('user');
    localStorage.removeItem('Token');
    localStorage.setItem('loggedin','false')
    this.isloggedin=localStorage.getItem('loggedin');
    return this.isloggedin;

   }

   adminlogin()
   {
     this.isadmin=localStorage.getItem('isadmin');
     return this.isadmin;
   }

getuser(id:any):Observable<any>
{
   return this.http.get(this.userurl+'/'+id);
}

storeToken(Token:any)
{
  localStorage.setItem("Token",Token);
}

getToken()
{
  return localStorage.getItem("Token");
}

loggedin():boolean
{
  return !!localStorage.getItem("Token")
}

getRole()
{
  let token:any=localStorage.getItem("Token");
  let jwtData = token.split('.')[1]
  let decodedJwtJsonData =atob(jwtData)
  let decodedJwtData = JSON.stringify(decodedJwtJsonData)
  let isAdmin = decodedJwtData.includes('Admin')
  if(isAdmin===true)
  {
    return true;
  }
  else
  {
    return false;
  }
}


UpdateUserAddress(body:any,id:any)
{
  let url=this.userurl+'/'+id+'/Patchuser';
   return this.http.patch(url,body,this.httpOptions);
}
}
