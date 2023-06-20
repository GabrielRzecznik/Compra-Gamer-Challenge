import { formatNumber } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    public dialogRef: MatDialogRef<ShoppingCartComponent>,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit() {
    const localStorageData = localStorage.getItem('shoppingCar');
    this.cartItems = localStorageData ? JSON.parse(localStorageData) : [];

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

  public clearShoppingCart() {
    localStorage.removeItem('shoppingCar');
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
