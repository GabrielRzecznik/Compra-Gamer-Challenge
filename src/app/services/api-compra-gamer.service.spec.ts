import { TestBed } from '@angular/core/testing';

import { ApiCompraGamerService } from './api-compra-gamer.service';

describe('ApiCompraGamerService', () => {
  let service: ApiCompraGamerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCompraGamerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
