import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FilterService {
  private id_subCategoriaSource = new Subject<number>();
  id_subCategoria$ = this.id_subCategoriaSource.asObservable();

  private imgCategoriaSource = new Subject<string>();
  imgCategoria$ = this.imgCategoriaSource.asObservable();

  public enviarId_subCategoria(id_subCategoria: number, imgCategoria: string) {
    this.id_subCategoriaSource.next(id_subCategoria);
    this.imgCategoriaSource.next(imgCategoria);
  }
}