import { Component } from '@angular/core';
import { ApiCompraGamerService } from 'src/app/services/api-compra-gamer.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent {
  categorias: any[] = [
    { id: 24, nombre: 'Perifericos' },
    { id: 5, nombre: 'Equipos y Notebooks' },
    { id: 7, nombre: 'Procesadores' },
    { id: 1, nombre: 'Mothers' },
    { id: 2, nombre: 'Placas de Video' },
    { id: 10, nombre: 'Memorias RAM' },
    { id: 9, nombre: 'Almacenamiento' },
    { id: 25, nombre: 'Refrigeración' },
    { id: 8, nombre: 'Gabinetes' },
    { id: 26, nombre: 'Fuentes' },
    { id: 6, nombre: 'Monitores y Televisores' }
  ];

  subcategorias: any[] = [];

  constructor(private apiCompraGamerService: ApiCompraGamerService, private FilterService: FilterService) { }

  ngOnInit() {
    this.getSubcategorias();
  }

  getSubcategorias() {
    this.apiCompraGamerService.getSubcategorias().subscribe(
      (subcategorias) => {
        this.subcategorias = subcategorias;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filter(subcategoria: any) {
    const numero: number = subcategoria['id'];
    this.FilterService.enviarId_subCategoria(numero);
  }
}