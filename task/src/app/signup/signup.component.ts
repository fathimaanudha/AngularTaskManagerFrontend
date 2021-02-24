import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {UserService} from '../user.service';
import {Userdata} from '../model/user.model';
import {PvalidatorService} from './pvalidator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private fb:FormBuilder,
    private pvalidator: PvalidatorService,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      
      password: ['', Validators.compose([Validators.required, this.pvalidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: this.pvalidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }

  userItem =new Userdata('','','')
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      alert('Successfully completed Registration, Login to continue');
      console.table(this.registerForm.value);      
      
    }
  }
  addUser(){
   
    this.userItem=this.registerForm.value;
     this.userService.registerUser(this.userItem);
    console.log("saved");
    
    this.router.navigate(['/login'])
      }
 

}
