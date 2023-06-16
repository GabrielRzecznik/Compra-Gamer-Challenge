import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  cartProductCount: number = 0;
  cartProduct: any[] = [];

  constructor() {
    const cartData = localStorage.getItem('shoppingCar');
    if (cartData) {
      this.cartProduct = JSON.parse(cartData);
    }
    this.cartProductCount = this.cartProduct.length;
    console.log("Número de objetos: ", this.cartProductCount);
  }
}