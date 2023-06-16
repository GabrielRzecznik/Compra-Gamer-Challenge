import { Component, NgModule, OnInit } from '@angular/core';
import { ApiCompraGamerService } from 'src/app/services/api-compra-gamer.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  productos: any[] = [];
  productosFilter: any[] = [];
  id_subCategoria: number = 0;
  existence = true;
  
  constructor(private apiCompraGamerService: ApiCompraGamerService, private FilterService: FilterService) { }

  ngOnInit() {
    this.getProductos();
    this.getFilter();
  }

  getProductos() {
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
  }

  addProduct(producto: string[]) {
    console.log(producto);
  }

  getFilter(){
    this.FilterService.id_subCategoria$.subscribe((id_subCategoria) => {
      this.id_subCategoria = id_subCategoria;
      this.getProductos();
    });
  };

}