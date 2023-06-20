import { formatNumber } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ApiCompraGamerService } from 'src/app/services/api-compra-gamer.service';
import { FilterService } from 'src/app/services/filter.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private maxQuantityAllowed: Product[] = [];
  public buttonStatus: { [productId: string]: boolean } = {};
  private shoppingCart: Product[] = [];
  public stockInCart = 0;
  public productValidity: boolean[] = [];

  constructor(
    private apiCompraGamerService: ApiCompraGamerService,
    private filterService: FilterService,
    private shoppingCartService: ShoppingCartService,
    private snackBar: MatSnackBar
  ) { }

  public ngOnInit() {
    this.getProducts();
    this.getFilter();
  }

  private getProducts() {
    if (this.id_subCategoria === 0) {
      this.apiCompraGamerService.getProducts().subscribe(
        (products) => {
          this.products = products;
          this.initializeProductValidity();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.apiCompraGamerService.getProducts().subscribe(
        (products) => {
          let count = 0;
          for (let i = 0; i < products.length; i++) {
            if (products[i].id_subcategoria === this.id_subCategoria) {
              this.productsFilter.push(products[i]);
              count++;
            }
          }
          if (count === 0) {
            this.existence = false;
          } else {
            this.existence = true;
          }
          this.products = this.productsFilter;
          this.productsFilter = [];
          this.initializeProductValidity();
        }
      );
    }
  }

  private initializeProductValidity() {
    this.productValidity = this.products.map((product) => this.validateMaxQuantityAllowed(product));
  }

  public addProduct(product: Product, i: number) {
    this.maxQuantityAllowed = JSON.parse(localStorage.getItem("shoppingCart")!) || [];
    this.stockInCart = 0;

    for (const item of this.maxQuantityAllowed) {
      if (item.id_producto === product.id_producto) {
        this.stockInCart++;
      }
    }

    if (product.vendible > this.stockInCart) {
      this.shoppingCartService.addProduct(product);
      this.openSnackBar(`${product.nombre} se agregó al carrito de compras`);

      if (product.vendible === (this.stockInCart + 1)) {
        this.productValidity[i] = true;
      }
    }
    this.stockInCart = 0;
  }

  public validateMaxQuantityAllowed(product: Product) {
    this.maxQuantityAllowed = JSON.parse(localStorage.getItem("shoppingCart")!) || [];
    this.stockInCart = 0;

    for (const item of this.maxQuantityAllowed) {
      if (item.id_producto === product.id_producto) {
        this.stockInCart++;
      }
    }

    if (product.vendible === this.stockInCart) {
      return true;
    } else {
      return false;
    }
  }

  private getFilter() {
    this.filterService.id_subCategoria$.subscribe((id_subCategoria) => {
      this.id_subCategoria = id_subCategoria;
      this.getProducts();
    });

    this.filterService.nameCategoria$.subscribe((nameCategoria) => {
      this.nameCategoria = nameCategoria;
    });
  }

  public formatPrice(precio: number): string {
    const formattedPrecio = formatNumber(precio, 'en-US', '1.2-2');
    const [integerPart, decimalPart] = formattedPrecio.split('.');
    const formattedDecimalPart = decimalPart === '00' ? '' : (decimalPart.length === 1 ? decimalPart + '0' : decimalPart);
    return integerPart.replace(/,/g, '.') + (formattedDecimalPart ? ',' + formattedDecimalPart : '');
  }

  public stockInCartCount(id_producto: number) {
    this.stockInCart = 0;

    if (localStorage.getItem("shoppingCart")) {
      if (localStorage.getItem("shoppingCart") !== "") {
        this.shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")!);
        for (const item of this.shoppingCart) {
          if (item.id_producto === id_producto) {
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
    this.filterService.getId_subCategoria(0);
    this.scrollToTop();
  }

  private scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  public openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      verticalPosition: "top",
      duration: 4000
    });
  }
}
