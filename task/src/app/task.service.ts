import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskUrl = "http://localhost:3000/task";
  // private newTaskUrl= "http://localhost:3000/task/insert";

  constructor(private http: HttpClient, private _router: Router) { }
  getTasks(){
    return this.http.get(this.taskUrl);
  }
  newTask(item){
    return this.http.post("http://localhost:3000/task/insert", {'task':item})
    .subscribe(data=>{console.log(data)})
  }
  singleTask(id:any){
    return this.http.get("http://localhost:3000/task/"+id);
  }
  delete(id,task)
  {
    return this.http.delete("http://localhost:3000/task/delete/"+id,task)
    .subscribe(data =>{console.log(data)})
  }
  edit(id,task){
    console.log('client update')
    return this.http.put("http://localhost:3000/task/update/"+id,task)
    .subscribe(data =>{console.log(data)})
  }
  completed(){
    return this.http.get("http://localhost:3000/task/done");
  }
}
