import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FilterService {
  private id_subCategoriaSource = new Subject<number>();
  id_subCategoria$ = this.id_subCategoriaSource.asObservable();

  private nameCategoriaSource = new Subject<string>();
  nameCategoria$ = this.nameCategoriaSource.asObservable();

  private imgCategoriaSource = new Subject<string>();
  imgCategoria$ = this.imgCategoriaSource.asObservable();

  public getCategoria(id_subCategoria: number, nameCategoria: string, imgCategoria: string) {
    this.id_subCategoriaSource.next(id_subCategoria);
    this.nameCategoriaSource.next(nameCategoria);
    this.imgCategoriaSource.next(imgCategoria);
  }

  public getId_subCategoria(id_subCategoria: number) {
    this.id_subCategoriaSource.next(id_subCategoria);
  }
}