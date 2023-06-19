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
    this.userDataService.subscriptionUser().subscribe({
      next:(user)=>{
        if (user && Object.values(user).length > 0) {
          this.sessionButton = `${user.nombre} ${user.apellido}`;
          return
        }
        
        this.sessionButton = 'Iniciar sesión';
      }
    })
  }

  ngOnDestroy() {
    this.sessionSubscription.unsubscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
}



