import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userDisplayName = '';
  constructor(public _auth:UserService,
    private _router:Router) { }

  ngOnInit(): void {
    this.userDisplayName = sessionStorage.getItem('loggedUser');
  }
  logoutUser(){
    sessionStorage.removeItem('token')
      this._router.navigate(['/'])
    }
}
