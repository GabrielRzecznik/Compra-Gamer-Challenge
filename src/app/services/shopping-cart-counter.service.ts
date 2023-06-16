import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartCounterService {
  private cartProduct: any[] = [];

  getCartProduct(): any[] {
    return this.cartProduct;
  }

  updateCartProduct(cartProduct: any[]): void {
    this.cartProduct = cartProduct;
  }
}