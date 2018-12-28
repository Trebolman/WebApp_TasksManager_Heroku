import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// interfaces
export interface Task{
  _id:string,
  name:string,
  description:string,
  state:string
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  // atributos
  public uri:string = "/";
  // public uri:string = "http://localhost:3000/";
  constructor(private _http:HttpClient) { }

  // metodos
  addTask(data):Observable<any>{
    return this._http.post(this.uri+'api/addTask',data);
    // return this._http.post('/api/addTask',data);
  }
  
  getTasks(username:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.uri+'api/getTasks',{username:username},{headers:headers});
    // return this._http.post('/api/getTasks',{username:username},{headers:headers});
  }
  
  removeTask(index:number,username:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.uri+'api/removeTask',{index,username},{headers:headers});
    // return this._http.post('/api/removeTask',{index,username},{headers:headers});
  }
  
  editTask(username:string, task:Task, index:number){
    let data = {
      name: task.name,
      description: task.description,
      username: username,
      state: task.state,
      index
    }
    return this._http.post(this.uri+'api/editTask',data);
    // return this._http.post('/api/editTask',data);
  }
}
