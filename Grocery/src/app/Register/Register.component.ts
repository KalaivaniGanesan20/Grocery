import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../Conformed.validator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../Datatype';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styles: ['input.ng-valid{border-left:5px solid green;}']
})
export class RegisterComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }
  constructor(private fb:FormBuilder,private http:HttpClient,private _route:Router,private authservice:AuthserviceService) { }

  Register=this.fb.group({
    firstname:["",[Validators.required,Validators.minLength(5),Validators.pattern(/^(?!.*([A-Za-z])\1{2})[A-Za-z]+$/)]],
    lastname:["",[Validators.required,Validators.minLength(1),Validators.pattern('[A-Z]+')]],
    emailid:["",[Validators.required,Validators.email,
      Validators.pattern(/^[\w-]+(\.[\w-]+)*@([a-z]{2,5})\.+[a-zA-Z]{2,}$/)]],
    phonenumber:["",[Validators.required,Validators.pattern('[6-9][0-9]+'),Validators.minLength(10),Validators.maxLength(10)]],
    password:["",[Validators.required,Validators.minLength(8),Validators.pattern('[a-z]+[@\_\.]+[0-9]+')]],
    cpassword:["",[Validators.required,Validators.minLength(8)]],
    cart:[[]],
    mywallet:[]
  },{validator:ConfirmedValidator('password','cpassword')});

  ngOnInit()
  {

  }
submitform(Register:FormGroup)
{
  const UserRegister={
    firstname:this.Register.value.firstname,
    lastname:this.Register.value.lastname,
    emailid:this.Register.value.emailid,
    phonenumber:this.Register.value.phonenumber,
    password:this.Register.value.password,
    cpassword:this.Register.value.cpassword,
    mycart:[],
    mywallet:0,
  }
  this.http.post<User>("https://localhost:7250/api/User",JSON.stringify(UserRegister),this.httpOptions).subscribe(res=>{

    Swal.fire({
      icon:'success',
      title:'successfully registered'
    })
    this.Register.reset();
    this._route.navigate(['Login']);
  },err=>{

  })
}

}

