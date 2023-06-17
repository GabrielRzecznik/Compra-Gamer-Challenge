import { formatNumber } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ApiCompraGamerService } from 'src/app/services/api-compra-gamer.service';
import { FilterService } from 'src/app/services/filter.service';
import { ShoppingCartCounterService } from 'src/app/services/shopping-cart-counter.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  private productsFilter: Product[] = [];
  private id_subCategoria: number = 0;
  private existence = true;
  public imgURL = "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_";
  public imgJpg = ".jpg";
  isCollapsed = false;

  constructor(private apiCompraGamerService: ApiCompraGamerService, private FilterService: FilterService, private shoppingCartCounterService: ShoppingCartCounterService, private breakpointObserver: BreakpointObserver) { }

  public ngOnInit() {
    this.getProductos();
    this.getFilter();

    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => {
      this.isCollapsed = result.matches;
    });
  }

  private getProductos() {
    if (this.id_subCategoria == 0) {
      this.apiCompraGamerService.getProductos().subscribe(
        (products) => {
          this.products = products;
        },
        (error) => {
          console.error(error);
        }
      );
    }else{
      this.apiCompraGamerService.getProductos().subscribe(
        (products) => {
          this.existence = false;
          for (let i = 0; i < products.length; i++) {
            if (products[i].id_subcategoria === this.id_subCategoria) {
              this.productsFilter.push(products[i]);
              this.existence = true;
            }
          }
          this.products = this.productsFilter;
          this.productsFilter = [];
        }
      );
    }
  }

  public addProduct(product: Product) {
    this.shoppingCartCounterService.addProduct(product);
  }

  private getFilter(){
    this.FilterService.id_subCategoria$.subscribe((id_subCategoria) => {
      this.id_subCategoria = id_subCategoria;
      this.getProductos();
    });
  };

  formatPrecio(precio: number): string {
    const formattedPrecio = formatNumber(precio, 'en-US', '1.2-2');
    const [integerPart, decimalPart] = formattedPrecio.split('.');
    const formattedDecimalPart = decimalPart === '00' ? '' : (decimalPart.length === 1 ? decimalPart + '0' : decimalPart);
    return integerPart.replace(/,/g, '.') + (formattedDecimalPart ? ',' + formattedDecimalPart : '');
  }
}