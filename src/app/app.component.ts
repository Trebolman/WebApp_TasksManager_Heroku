import { Component } from '@angular/core';
import { AuthService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public auth:AuthService, private _router:Router){
    console.log("[app-root] Esta logueado: "+auth.isLoggedIn())
    if(auth.isLoggedIn()){
      this._router.navigateByUrl("/tasks");
    }else{
      this._router.navigateByUrl("/login");
    }
  }
}
// export class AppComponent {
//   constructor(){

// }
