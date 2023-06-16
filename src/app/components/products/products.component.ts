import { Component, NgModule, OnInit } from '@angular/core';
import { ApiCompraGamerService } from 'src/app/services/api-compra-gamer.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  public spinner: boolean = true;
  productos: any[] = [];
  productosFilter: any[] = [];
  id_subCategoria: number = 0;
  existence = true;
  imgURL = "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_";
  imgJpg = ".jpg";
  shoppingCar: any[] = [];
  
  constructor(private apiCompraGamerService: ApiCompraGamerService, private FilterService: FilterService) { }

  public ngOnInit() {
    this.getProductos();
    this.getFilter();
  }

  private getProductos() {
    this.spinner = true;
    if (this.id_subCategoria == 0) {
      this.apiCompraGamerService.getProductos().subscribe(
        (productos) => {
          this.productos = productos;
        },
        (error) => {
          console.error(error);
        }
      );
    }else{
      this.apiCompraGamerService.getProductos().subscribe(
        (productos) => {
          this.existence = false;
          for (let i = 0; i < productos.length; i++) {
            if (productos[i].id_subcategoria === this.id_subCategoria) {
              this.productosFilter.push(productos[i]);
              this.existence = true;
            }
          }
          this.productos = this.productosFilter;
          this.productosFilter = [];
        }
      );
    }
    this.spinner = false;
  }

  addProduct(producto: string[]) {
    const existingCartData = localStorage.getItem('shoppingCar');
    let shoppingCar: string[] = [];
  
    if (existingCartData) {
      shoppingCar = JSON.parse(existingCartData);
    }
  
    shoppingCar = shoppingCar.concat(producto);
    localStorage.setItem('shoppingCar', JSON.stringify(shoppingCar));
  }

  getFilter(){
    this.FilterService.id_subCategoria$.subscribe((id_subCategoria) => {
      this.id_subCategoria = id_subCategoria;
      this.getProductos();
    });
  };
}