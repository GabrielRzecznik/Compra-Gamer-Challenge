import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

interface Banner {
  id: number;
  name: string;
  URL: string;
}

@Component({
  selector: 'app-subcategory-banner',
  templateUrl: './subcategory-banner.component.html',
  styleUrls: ['./subcategory-banner.component.css']
})

export class SubcategoryBannerComponent {
  private id_subCategoria: number = 0;
  private startOfUrl: string = 'https://imagenes.compragamer.com/bannerSubcategoria/';
  public bannerSelect: string = this.startOfUrl + 'subcategoria_default.jpg';
  public name: string = "Destacado";
  
  constructor(private FilterService: FilterService) { }

  public ngOnInit() {
    this.getFilter();
  }

  getFilter(){
    this.FilterService.id_subCategoria$.subscribe((id_subCategoria) => {
      this.id_subCategoria = id_subCategoria;
      this.getBanner();
    });
  };

  private getBanner() {
    if (this.id_subCategoria != 0) {
      for (let i = 0; i < this.banner.length; i++) {
        if (this.banner[i].id == this.id_subCategoria) {
          this.bannerSelect = this.banner[i].URL;
          this.name = this.banner[i].name;
        }
      }
    }else{
      this.bannerSelect = this.startOfUrl + 'subcategoria_default.jpg';
      this.name = "Destacado";
    }
  }

  public banner: Banner[] = [
      { id: 0, name: "" , URL: this.startOfUrl + 'subcategoria_default.jpg' },
      { id: 2, name: "Mouse", URL: this.startOfUrl + 'DC_20221104110807_d6hTAzhy.jpg' },
      { id: 39, name: "Teclado", URL: this.startOfUrl + 'DC_20221104111058_8PhPaYKo.jpg' },
      { id: 8, name: "Auriculares", URL: this.startOfUrl + 'DC_20221104110252_gBJtM4up.jpg' },
      { id: 58, name: "Notebooks", URL: this.startOfUrl + 'DC_20221104110904_jUnNjXRB.jpg' },
      { id: 27, name: "Procesadores AMD", URL: this.startOfUrl + 'DC_20221103172902_S2XKKUMf.jpg' },
      { id: 48, name: "Procesadores Intel", URL: this.startOfUrl + 'DC_20221103172941_VhI59w92.jpg' },
      { id: 26, name: "Mothers AMD", URL: this.startOfUrl + 'DC_20221104135400_YsQS3779.jpg' },
      { id: 49, name: "Mothers Intel", URL: this.startOfUrl + 'DC_20221104135336_bMc9oeLn.jpg' },
      { id: 6, name: "Placas de Video GeForce", URL: this.startOfUrl + 'DC_20221104110038_mBUUQE6x.jpg' },
      { id: 62, name: "Placas de Video Radeon AMD", URL: this.startOfUrl + 'DC_20221104110215_FUPiJqSw.jpg' },
      { id: 15, name: "Memorias", URL: this.startOfUrl + 'DC_20221103173016_tZSSSFhk.jpg' },
      { id: 19, name: "Disco Rígido", URL: this.startOfUrl + 'DC_20221103173157_vuudmpOc.jpg' },
      { id: 35, name: "Coolers Fan", URL: this.startOfUrl + 'DC_20221104110418_RhjFp9SN.jpg' },
      { id: 36, name: "Coolers CPU", URL: this.startOfUrl + 'DC_20221207153458_b2kp6LrG.jpg' },
      { id: 7, name: "Gabinetes", URL: this.startOfUrl + 'DC_20221103173257_gSVeKLeh.jpg' },
      { id: 34, name: "Fuentes de Alimentación", URL: this.startOfUrl + 'DC_20221104110721_n8hIbGpL.jpg' },
      { id: 5, name: "Monitores y Pantallas", URL: this.startOfUrl + 'DC_20221104111402_9KiYf96L.jpg' },
    ];
}
