import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-subcategory-banner',
  templateUrl: './subcategory-banner.component.html',
  styleUrls: ['./subcategory-banner.component.css']
})

export class SubcategoryBannerComponent {
  public id_subCategoria: number = 0;
  private startOfUrl: string = 'https://compragamer.net/categorias_demo/';
  public bannerSelect: string = this.startOfUrl + 'subcategoria_default.jpg';
  public name: string = "Destacado";
  public imgCategoria: string = "https://imagenes.compragamer.com/bannerSubcategoria/subcategoria_default.jpg";
  
  constructor(private FilterService: FilterService) { }

  public ngOnInit() {
    this.getFilter();
    this.getBanner();
  }

  private getFilter(){
    this.FilterService.id_subCategoria$.subscribe((id_subCategoria) => {
      if (this.id_subCategoria != 0) {
        this.id_subCategoria = id_subCategoria;
      }else{
        this.imgCategoria = "https://imagenes.compragamer.com/bannerSubcategoria/subcategoria_default.jpg";
      }
    });
  };

  private getBanner() {
    this.FilterService.imgCategoria$.subscribe((imgCategoria) => {
      this.imgCategoria = this.startOfUrl + imgCategoria;
    });
  }
}
