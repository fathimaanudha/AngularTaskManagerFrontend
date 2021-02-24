import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _registerUrl = "http://localhost:3000/register";
  private _loginUrl    =    "http://localhost:3000/login";

  constructor(private http: HttpClient, private _router: Router) { }
  
  registerUser(item){
    return this.http.post<any>(this._registerUrl,{'user':item}).subscribe(data=>{console.log(data)})
    
   }
   loginUser(user){
    return this.http.post<any>(this._loginUrl,user)
   }
   loggedIn(){
     return !!sessionStorage.getItem('token')
   }

//  
   logoutUser(){
    sessionStorage.removeItem('token')
     this._router.navigate(['/'])
   }
   getToken(){
     return sessionStorage.getItem('token')
   }
}
