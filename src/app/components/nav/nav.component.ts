import { Component, OnInit } from '@angular/core';
import { ShoppingCartCounterService } from 'src/app/services/shopping-cart-counter.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  cartProductCount: number = 0;

  constructor(private shoppingCartCounterService: ShoppingCartCounterService) {}

  public ngOnInit() {
    this.shoppingCartCounterService.subscriptionProduct().subscribe({
      next:(counter) => {
        this.cartProductCount = counter;
        
      }
    });
  }
}
