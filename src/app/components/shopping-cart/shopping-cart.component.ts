import { formatNumber } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  public cartItems!: Product[];
  public imgURL = "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_";
  public imgJpg = ".jpg";
  public price: number = 0;
  private isExtraSmallScreen: boolean = false;
  private isSmallScreen: boolean = false;
  public isHidden: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ShoppingCartComponent>,
    private snackBar: MatSnackBar,
    private shoppingCartCounter: ShoppingCartService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isExtraSmallScreen = result.breakpoints[Breakpoints.XSmall];
        this.isSmallScreen = result.breakpoints[Breakpoints.Small];
        this.isHidden = this.isExtraSmallScreen || this.isSmallScreen;
    });
  }

  public ngOnInit() {
    this.cartItems = this.shoppingCartCounter.refreshProduct();

    this.price = 0;
    for (let item of this.cartItems) {
      this.price += (item.precio + (item.precio * (item.iva / 100))); 
    }
  }

  public formatPrice(precio: number): string {
    const formattedPrecio = formatNumber(precio, 'en-US', '1.2-2');
    const [integerPart, decimalPart] = formattedPrecio.split('.');
    const formattedDecimalPart = decimalPart === '00' ? '' : (decimalPart.length === 1 ? decimalPart + '0' : decimalPart);
    return integerPart.replace(/,/g, '.') + (formattedDecimalPart ? ',' + formattedDecimalPart : '');
  }

  public removeProduct(indexToRemove: number, nameProduct: string){
    const shoppingCartString = localStorage.getItem('shoppingCart');
    if (shoppingCartString) {
      const shoppingCart = JSON.parse(shoppingCartString);
      shoppingCart.splice(indexToRemove, 1);
      const updatedShoppingCartString = JSON.stringify(shoppingCart);
      localStorage.setItem('shoppingCart', updatedShoppingCartString);
      this.cartItems = this.shoppingCartCounter.refreshProduct();
      this.price = 0;
      this.openSnackBar(`¡Producto ${nameProduct} removido con éxito!`);
      for (let item of this.cartItems) {
        this.price += (item.precio + (item.precio * (item.iva / 100))); 
      }
      if (this.cartItems.length === 0) {
        this.dialogRef.close();
      }
    }
  }

  public clearShoppingCart() {
    localStorage.removeItem('shoppingCart');
    this.shoppingCartCounter.removeProducts();
    this.openSnackBar("¡Carrito de compras vaciado con éxito!");
    this.dialogRef.close();
  }

  public openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      verticalPosition: "top",
      duration: 4000
    });
  }
}
