import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user.interface';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  public hide = true;
  public title: string = "Menú de inicio de sesión";
  public showRegister: boolean = false;
  public isLoggedIn: boolean = false;

  constructor(public dialogRef: MatDialogRef<RegisterComponent>, private userDataService: UserDataService){}

  closeDialogo(): void {
    this.dialogRef.close();
  }

  public ngOnInit() {
    if (localStorage.getItem('user') != null) {
      this.isLoggedIn = true;
      this.title = "Cuenta"
    }
  }

  public loggedOut(){
    this.userDataService.removeUser();
    localStorage.clear();
  }

  public nombreFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]);
  public apellidoFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]);
  public DNIFormControl = new FormControl('', [Validators.required, Validators.pattern(/^\d{7,8}$/)]);
  public telefonoFormControl = new FormControl('', [Validators.required, Validators.pattern(/^(\+\d{1,3}\s?)?(\d{2,4}[\s-]?)?\d{4}[\s-]?\d{4}$/)]);
  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordFormControl = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/)]);
  
  public nombreTouched = false;
  public apellidoTouched = false;
  public dniTouched = false;
  public emailTouched = false;
  public telefonoTouched = false;
  public passwordTouched = false;
  

  public visibilityFromRegister() {
      this.showRegister = true;
  }

  public submitForm() {
    const user = {
      nombre: this.nombreFormControl.value,
      apellido: this.apellidoFormControl.value,
      dni: this.DNIFormControl.value,
      email: this.emailFormControl.value,
      telefono: this.telefonoFormControl.value,
      password: this.passwordFormControl.value
    };
      
    if (this.validateForm()) {
      localStorage.setItem('user', JSON.stringify(user));

      this.userDataService.changeUser(user as User);
      this.clearForm();
      this.closeDialogo();
    }
    
  }

  public validateForm(): boolean {
    if (this.nombreFormControl.value === "" || this.apellidoFormControl.value === "" || this.DNIFormControl.value === "" || this.emailFormControl.value === "" || this.telefonoFormControl.value === "" || this.passwordFormControl.value === "") {
      alert('Por favor, complete todos los campos antes de enviar el formulario');
      return false;
    }else if (
      this.nombreFormControl.invalid || !this.nombreFormControl.touched ||
      this.apellidoFormControl.invalid || !this.apellidoFormControl.touched ||
      this.DNIFormControl.invalid || !this.DNIFormControl.touched ||
      this.telefonoFormControl.invalid || !this.telefonoFormControl.touched ||
      this.emailFormControl.invalid || !this.emailFormControl.touched ||
      this.passwordFormControl.invalid || !this.passwordFormControl.touched
    ) {
      return false;
    }
    return true;
  }

  public clearForm() {
    this.nombreTouched = false;
    this.apellidoTouched = false;
    this.dniTouched = false;
    this.emailTouched = false;
    this.telefonoTouched = false;
    this.passwordTouched = false;
    this.emailFormControl.reset();
    this.nombreFormControl.reset();
    this.apellidoFormControl.reset();
    this.DNIFormControl.reset();
    this.telefonoFormControl.reset();
    this.emailFormControl.reset();
    this.passwordFormControl.reset();
  }
}