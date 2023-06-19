import { formatNumber } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ApiCompraGamerService } from 'src/app/services/api-compra-gamer.service';
import { FilterService } from 'src/app/services/filter.service';
import { ShoppingCartCounterService } from 'src/app/services/shopping-cart-counter.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  private productsFilter: Product[] = [];
  private id_subCategoria: number = 0;
  public nameCategoria: string = "";
  public existence = true;
  public imgURL = "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_";
  public imgJpg = ".jpg";
  public noStock = true;
  private shoppingCar: Product[] = [];
  public stockInCart = 0;

  constructor(private apiCompraGamerService: ApiCompraGamerService, private FilterService: FilterService, private shoppingCartCounterService: ShoppingCartCounterService) { }

  public ngOnInit() {
    this.getProducts();
    this.getFilter();
  }

  private getProducts() {
    if (this.id_subCategoria == 0) {
      this.apiCompraGamerService.getProducts().subscribe(
        (products) => {
          this.products = products;
        },
        (error) => {
          console.error(error);
        }
      );
    }else{
      this.apiCompraGamerService.getProducts().subscribe(
        (products) => {
          let count = 0;
          for (let i = 0; i < products.length; i++) {
            if (products[i].id_subcategoria === this.id_subCategoria) {
              this.productsFilter.push(products[i]);
              count++;
            }
          }
          if (count == 0) {
            this.existence = false;
          }else{
            this.existence = true;
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

  private getFilter() {
    this.FilterService.id_subCategoria$.subscribe((id_subCategoria) => {
      this.id_subCategoria = id_subCategoria;
      this.getProducts();
    });

    this.FilterService.nameCategoria$.subscribe((nameCategoria) => {
      this.nameCategoria = nameCategoria;
    });
  }

  public formatPrecio(precio: number): string {
    const formattedPrecio = formatNumber(precio, 'en-US', '1.2-2');
    const [integerPart, decimalPart] = formattedPrecio.split('.');
    const formattedDecimalPart = decimalPart === '00' ? '' : (decimalPart.length === 1 ? decimalPart + '0' : decimalPart);
    return integerPart.replace(/,/g, '.') + (formattedDecimalPart ? ',' + formattedDecimalPart : '');
  }

  public stockInCartCount(id_producto: number){
    this.stockInCart = 0;
    
    if (localStorage.getItem("shoppingCar")) {
      if (localStorage.getItem("shoppingCar") !== "") {
        this.shoppingCar = JSON.parse(localStorage.getItem("shoppingCar")!);
        for (const item of this.shoppingCar) {
          if (item.id_producto == id_producto) {
            this.stockInCart++;
          }
        }
      }
    }
    return this.stockInCart;
  }

  public onChipRemoved() {
    this.nameCategoria = "";
    this.id_subCategoria = 0;
    this.existence = true;
    this.getProducts();
    this.updateBanner();
  }

  private updateBanner() {
    this.FilterService.getId_subCategoria(0);
    this.scrollToTop();
  }

  private scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}