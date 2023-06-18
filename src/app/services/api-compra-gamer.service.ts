import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubCategories } from '../interfaces/subCategories.interface';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})

export class ApiCompraGamerService {
  constructor(private http: HttpClient) { }

  public getSubcategories(): Observable<SubCategories[]> {
    const url = 'https://static.compragamer.com/test/subcategorias.json';
    return this.http.get<SubCategories[]>(url);
  }

  public getProducts(): Observable<Product[]> {
    const url = 'https://static.compragamer.com/test/productos.json';
    return this.http.get<Product[]>(url);
  }
}
