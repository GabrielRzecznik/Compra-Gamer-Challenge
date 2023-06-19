import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Users } from 'src/app/interfaces/user.interface';

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
  public userName: string = localStorage.getItem('nombre') || "";
  public userSurname: string = localStorage.getItem('apellido') || "";
  public userEmail: string = localStorage.getItem('email') || "";
  public userDNI: string = localStorage.getItem('dni') || "";
  public userPhone: string = localStorage.getItem('telefono') || "";

  constructor(public dialogRef: MatDialogRef<0>){}

  closeDialogo(): void {
    this.dialogRef.close();
  }

  public ngOnInit() {
    if (localStorage.getItem('nombre') != null) {
      this.isLoggedIn = true;
      this.title = "Cuenta"
    }
  }

  public loggedOut(){
    localStorage.clear();
  }

  public user: Users = {
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    telefono: '',
    password: '',
  };
  
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
    this.user.nombre = this.nombreFormControl.value || "";
    this.user.apellido = this.apellidoFormControl.value || "";
    this.user.dni = this.DNIFormControl.value || "";
    this.user.email = this.emailFormControl.value || "";
    this.user.telefono = this.telefonoFormControl.value || "";
    this.user.password = this.passwordFormControl.value || "";

    if (this.validateForm()) {
      localStorage.setItem('nombre', this.user.nombre);
      localStorage.setItem('apellido', this.user.apellido);
      localStorage.setItem('dni', this.user.dni);
      localStorage.setItem('email', this.user.email);
      localStorage.setItem('telefono', this.user.telefono);
      localStorage.setItem('contraseña', this.user.password);

      this.clearForm();
      this.closeDialogo();
    }
  }

  public validateForm(): boolean {
    if (this.user.nombre === "" || this.user.apellido === "" || this.user.dni === "" || this.user.email === "" || this.user.telefono === "" || this.user.password === "") {
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
    this.user = {
      nombre: '',
      apellido: '',
      dni: '',
      email: '',
      telefono: '',
      password: '',
    };
    
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