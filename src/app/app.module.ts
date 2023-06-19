import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { LayoutModule } from '@angular/cdk/layout';
import {MatChipsModule} from '@angular/material/chips';
import {MatBadgeModule} from '@angular/material/badge';

//Components
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { SubcategoriesComponent } from './components/subcategories/subcategories.component';
import { NavComponent } from './components/nav/nav.component';

//Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';//Nav
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { SubcategoryBannerComponent } from './components/subcategory-banner/subcategory-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavComponent,
    SubcategoriesComponent,
    SubcategoryBannerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //LayoutModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
