import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiCompraGamerService {
  constructor(private http: HttpClient) { }

  public getSubcategorias(): Observable<any> {
    const url = 'https://static.compragamer.com/test/subcategorias.json';
    return this.http.get<any>(url);
  }

  public getProductos(): Observable<any> {
    const url = 'https://static.compragamer.com/test/productos.json';
    return this.http.get<any>(url);
  }
}
