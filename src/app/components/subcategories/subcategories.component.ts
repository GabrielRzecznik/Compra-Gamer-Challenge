import { Component, HostListener } from '@angular/core';
import { Category } from 'src/app/interfaces/category.interface';
import { SubCategory } from 'src/app/interfaces/subCategory.interface';
import { ApiCompraGamerService } from 'src/app/services/api-compra-gamer.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})

export class SubcategoriesComponent {
  public categories: Category[] = [
    { id: 24, name: 'Perifericos' },
    { id: 5, name: 'Equipos y Notebooks' },
    { id: 7, name: 'Procesadores' },
    { id: 1, name: 'Mothers' },
    { id: 2, name: 'Placas de Video' },
    { id: 10, name: 'Memorias RAM' },
    { id: 9, name: 'Almacenamiento' },
    { id: 25, name: 'Refrigeración' },
    { id: 8, name: 'Gabinetes' },
    { id: 26, name: 'Fuentes' },
    { id: 6, name: 'Monitores y Televisores' }
  ];

  public subcategories: SubCategory[] = [];

  public showScroll = false;

  constructor (private apiCompraGamerService: ApiCompraGamerService, private FilterService: FilterService) { }

  public ngOnInit() {
    this.getSubcategories();
  }

  private getSubcategories() {
    this.apiCompraGamerService.getSubcategories().subscribe(
      (subcategories) => {
        this.subcategories = subcategories;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public filter(subcategoria: SubCategory) {
    const number: number = subcategoria['id'];
    const name: string = subcategoria['nombre'];
    const img: string = subcategoria['imagen'];
    this.FilterService.getCategoria(number, name, img);
    this.scrollToTop();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScroll = (window.scrollY > 0);
  }

  public scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}