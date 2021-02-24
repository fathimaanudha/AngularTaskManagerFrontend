import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap,Router } from '@angular/router';
import {map} from "rxjs/operators";
import {TaskService} from '../task.service';
import {UserService} from '../user.service'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private taskService:TaskService, public _auth:UserService) { }
  show=false;
  mindate = new Date();

  tasks:[];
  task;
  id;
  taskItem={
    email:'',
    newtask:'',
    due:'',
    status:''


  }
  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(bkId =>{
      this.id=bkId;
      this.taskService.singleTask(this.id).subscribe(bk =>{
        this.task=bk;
        this.taskItem = {
          email:(bk['email']),
          newtask:(bk['newtask']),
          due:(bk['due']),
          status:(bk['status'])
        }
      })
    })
  }
  delete(task:any){
   let isok=confirm('Are you sure to delete this task??')
   if(isok){
    this.taskService.delete(this.id,this.taskItem)
    this.router.navigate(['/dashboard']);
   }
  
  }
  upStatus(){
    this.taskService.edit(this.id,this.taskItem);
    this.show=false;
    
  }
  editAll(){
    this.taskService.edit(this.id,this.taskItem);
    this.show=false;
    this.router.navigate(['/dashboard']);
  }
  edit(){
    this.show=true;
  }
}
