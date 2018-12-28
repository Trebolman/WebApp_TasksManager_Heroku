import { Component, OnInit } from '@angular/core';
import { AuthService, UserDetails } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { TasksService, Task } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  // atributos
  public user:UserDetails;
  // public name:string;
  // public description:string;
  public task:Task={
    _id:'',
    name: '',
    description: '',
    state: 'Pendiente'
  }
  public tasks:Array<Task> = new Array();
  public index:number;

  constructor(private _auth:AuthService, private _router:Router, private _taskService:TasksService) {
    this.user = this._auth.getUserDetails();
    console.log(this.user);
   }

  ngOnInit() {
    this.getTasks();
  }

  addTask(){
    // console.log("[addTask|component] this.task:");
    // console.log(this.task);
    
    let data = {
      name: this.task.name,
      description: this.task.description,
      username: this.user.username
    };
    this._taskService.addTask(data).subscribe((response)=>{
      // console.log("[addTask] response:");
      // console.log(response);
      this.task.name = "";
      this.task.description = "";
      this.getTasks();
    });
  }

  getTasks(){
    this._taskService.getTasks(this.user.username).subscribe((response)=>{
      // console.log("[getTasks] response:");
      // console.log(response);
      // console.log(typeof(response));
      // console.log(response.Agenda);

      this.tasks = response;
      // this.tasks = this.agenda.Agenda;
      console.log(this.tasks)
    });
  }

  removeTask(index:number){
    // let taskID:string = this.tasks[index]._id;
    this._taskService.removeTask(index,this.user.username).subscribe((response)=>{
      console.log(response);
      this.getTasks();
    });
  }

  changeStateTask(index:number){
    this.task = this.tasks[index];
    if(this.task.state == "Pendiente"){this.task.state = "Hecho";}
    else{this.task.state = "Pendiente";}

    this._taskService.editTask(this.user.username,this.task,index).subscribe((response)=>{
      console.log(response);
      this.getTasks();
    });
  }

  editTask(index:number){
    this._taskService.editTask(this.user.username,this.task, this.index).subscribe((response)=>{
      console.log(response);
      // this.getTasks();
    });
  }

  getTask(index:number){
    
    this.index = index;
    this.task = this.tasks[index];
    console.log("[taskComponent|getTask] task");
    console.log(this.task);
  };

  logout(){
    this._auth.logout();
    // this._router.navigateByUrl("/")
  }

}
