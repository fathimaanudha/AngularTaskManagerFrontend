import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TaskService} from '../task.service';
import {task} from '../model/task.model';
import {UserService} from '../user.service'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

mindate = new Date();

new;
tasks:[];
completed:[];
theCheckbox = false;
done=false;


  constructor(private router: Router,private taskService:TaskService, public _auth:UserService) { }
  taskItem = new task( null,null, null,null)

  ngOnInit(): void {
    
    this.taskService.getTasks().subscribe((data)=>{
      this.tasks=JSON.parse(JSON.stringify(data))
    })
    this.taskService.completed().subscribe((data)=>{
      this.completed=JSON.parse(JSON.stringify(data))
    })

    
  }
  
  create(){
    this.new=true;
    
  }
  newTask(){
    this.taskItem.email= sessionStorage.getItem('loggedUser');
    this.taskItem.status="todo";
    this.taskItem.due=this.taskItem.due.toLocaleString().substring(0, 10);
    this.taskService.newTask(this.taskItem);
    alert('New task added')
    console.table(this.taskItem)
    this.new=false;
    this.router.navigate(['/dashboard'])
    location.reload();
  }
  done1(){
    this.done=true;
  }
  hidden(){
    this.new=false;
  }
}
