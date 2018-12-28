import { Component } from '@angular/core';
import { AuthService, TokenPayload } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  credentials: TokenPayload = {
    username: '',
    email: '',
    password: ''
  };
// atributos
  public mensaje:string = "Tenga cuidado al ingrear su username";
  constructor(private auth:AuthService, private router: Router) {}

  register() {
    // console.log("[register] credentials:");
    // console.log(this.credentials);
    this.auth.testUsername(this.credentials.username).subscribe((response)=>{
      // console.log("[testUsername] response:");
      // console.log(response);
      
      if(response.disponible){
        this.auth.register(this.credentials).subscribe((response) => {
          console.log(response);
          
          this.router.navigateByUrl('/login');
        }, (err) => {
          console.error("[register] Error: "+err);
        });
        
      }else{
        this.mensaje = "username ya usado, por favor ingrese otro";
      }
    });
  }
}
