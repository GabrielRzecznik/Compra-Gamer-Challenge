import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  hide = true;

  public title: string = "Inicio de sesión";

  public showLogin: boolean = true;
  public showRecord: boolean = false;

  public textButton: string = "Registrarse";

  public widthButton : string = "";

  changeForm(){
    if (this.title == "Inicio de sesión") {
      this.title = "Registrarse";
      this.textButton = "Inicio de sesión";
      this.showLogin = false;
      this.showRecord = true;
    }else{
      this.title = "Inicio de sesión";
      this.textButton = "Registrarse";
      this.showLogin = true;
      this.showRecord = false;
    }
  }
}
