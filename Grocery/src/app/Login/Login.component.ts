import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,FormBuilder, Validators}from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styles: ['input.ng-valid{border-left:5px solid green;}']

})

export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private _http:HttpClient,private router:Router,private service:AuthserviceService,private route:ActivatedRoute) {}

   LoginForm:FormGroup|any;
   isloggedin:any;
   isAdminLogin:any;
   userdata:any;
   retUrl:any='Home';

   httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': ' application/json-patch+json'
    })
  }
    ngOnInit()
    {
        this.LoginForm=new FormGroup({
        "emailid":new FormControl,
        "password":new FormControl});
          this.route.queryParamMap.subscribe(parama=>{
          this.retUrl=parama.get('retUrl');});

      }
      Loginuser(LoginForm:any)
      {
          this.service.login(LoginForm,this.retUrl);
      }

}


