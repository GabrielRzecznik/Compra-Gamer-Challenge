import { TestBed } from '@angular/core/testing';

import { ShoppingCartCounterService } from './shopping-cart-counter.service';

describe('ShoppingCartCounterService', () => {
  let service: ShoppingCartCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
