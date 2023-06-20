import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { UserDataService } from 'src/app/services/user-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit, OnDestroy {
  public cartProductCount: number = 0;
  public sessionButton = 'Iniciar sesión';
  private sessionSubscription!: Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private userDataService: UserDataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  public ngOnInit() {
    this.shoppingCartService.subscriptionProduct().subscribe({
      next:(counter) => {
        this.cartProductCount = counter;
      }
    });

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

  public openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

  public openDialogShoppingCart(){
    if (localStorage.getItem("shoppingCart") !== null) {
      const dialogRefShoppingCart = this.dialog.open(ShoppingCartComponent);
  
      dialogRefShoppingCart.afterClosed().subscribe(result => {
      });
    }else{
      this.openSnackBar("¡El carrito de compras está vacío!");
    }
  }

  public openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      verticalPosition: "top",
      duration: 4000
    });
  }

  ngOnDestroy() {
    this.sessionSubscription.unsubscribe();
  }
}