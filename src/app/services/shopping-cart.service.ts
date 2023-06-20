import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  private countProduct = new BehaviorSubject<number>(JSON.parse(localStorage.getItem('shoppingCart') || '[]').length || 0);

  constructor() { }

  public addProduct(product: Product) {
    const existingCartData = localStorage.getItem('shoppingCart');
    let shoppingCart: Product[] = [];
  
    if (existingCartData) {
      shoppingCart = JSON.parse(existingCartData);
    }

    shoppingCart.push(product);
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    this.countProduct.next(shoppingCart.length);
  }

  public removeProducts() {
    this.countProduct.next(0);
  }

  public refreshProduct() {
    let shoppingCart: Product[] = [];
    const existingCartData = localStorage.getItem('shoppingCart');
    if (existingCartData) {
      shoppingCart = JSON.parse(existingCartData);
    }
    this.countProduct.next(shoppingCart.length);
    if (shoppingCart.length === 0) {
      localStorage.removeItem('shoppingCart');
    }
    return shoppingCart;
  }
  
  public subscriptionProduct() {
    return this.countProduct.asObservable();
  }
}