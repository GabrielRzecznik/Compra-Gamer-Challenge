import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FilterService {
  private id_subCategoriaSource = new Subject<number>();
  id_subCategoria$ = this.id_subCategoriaSource.asObservable();

  public enviarId_subCategoria(id_subCategoria: number) {
    this.id_subCategoriaSource.next(id_subCategoria);
  }
}