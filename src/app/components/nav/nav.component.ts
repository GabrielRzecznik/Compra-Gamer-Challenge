import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { UserDataService } from 'src/app/services/user-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  public sessionButton = 'Iniciar sesión';
  private sessionSubscription!: Subscription;

  constructor(
    public dialog: MatDialog,
    private userDataService: UserDataService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('nombre') != null) {
      this.sessionButton = (localStorage.getItem('nombre') || "") + " " + (localStorage.getItem('apellido') || "");
    }
  }

  ngOnDestroy() {
    this.sessionSubscription.unsubscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
      //Borrar y arreglar
      this.fullName();
    });
  }

  private fullName(){
    this.sessionSubscription = this.userDataService.subscriptionUser().subscribe(fullName => {
      if (localStorage.getItem('nombre') != null) {
        this.sessionButton = (localStorage.getItem('nombre') || "") + " " + (localStorage.getItem('apellido') || "");
      }else{
        this.sessionButton = 'Iniciar sesión';
      }
    });
  }
}



