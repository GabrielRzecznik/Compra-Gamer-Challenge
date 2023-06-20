import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  private countProduct = new BehaviorSubject<number>(JSON.parse(localStorage.getItem('shoppingCar') || '[]').length || 0);

  constructor() { }

  public addProduct(product: Product) {
    const existingCartData = localStorage.getItem('shoppingCar');
    let shoppingCar: Product[] = [];
  
    if (existingCartData) {
      shoppingCar = JSON.parse(existingCartData);
    }

    shoppingCar.push(product);
    localStorage.setItem('shoppingCar', JSON.stringify(shoppingCar));
    this.countProduct.next(shoppingCar.length);
  }

  public removeProducts() {
    this.countProduct.next(0);
  }

  public refreshProduct() {
    let shoppingCar: Product[] = [];
    const existingCartData = localStorage.getItem('shoppingCar');
    if (existingCartData) {
      shoppingCar = JSON.parse(existingCartData);
    }
    this.countProduct.next(shoppingCar.length);
    if (shoppingCar.length === 0) {
      localStorage.removeItem('shoppingCar');
    }
    return shoppingCar;
  }
  
  public subscriptionProduct() {
    return this.countProduct.asObservable();
  }
}