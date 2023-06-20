import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public cartProductCount: number = 0;

  constructor(
    private shoppingCartService: ShoppingCartService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit() {
    this.shoppingCartService.subscriptionProduct().subscribe({
      next:(counter) => {
        this.cartProductCount = counter;
      }
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
}
