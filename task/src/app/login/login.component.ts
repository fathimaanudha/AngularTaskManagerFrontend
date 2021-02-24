import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../user.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {email:"",password:""};
  constructor(private _router:Router, private userService:UserService ) { }

  ngOnInit(): void {
  }
  loginUser(){
    console.log(this.loginUserData.email)
    console.log(this.loginUserData.password)    
    this.userService.loginUser(this.loginUserData)
      .subscribe(
        res=>{
          console.log(res.token)
          sessionStorage.setItem('loggedUser', this.loginUserData.email);
          sessionStorage.setItem('token',res["token"]);
          alert('Welcome '+ this.loginUserData.email)
          this._router.navigate(['/dashboard']);

        },
        err =>{ 
          console.log(err);
          alert('Invalid User or password!')
          this._router.navigate(['/login'])
        }
      )}
}
