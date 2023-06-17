import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartCounterService {
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

  public subscriptionProduct() {
    return this.countProduct.asObservable();
  }
}