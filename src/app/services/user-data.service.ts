import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userName = new BehaviorSubject<string>(localStorage.getItem('nombre') || '');
  private userSurname = new BehaviorSubject<string>(localStorage.getItem('apellido') || '');

  public subscriptionUser(): Observable<string> {
    return combineLatest([this.userName, this.userSurname]).pipe(
      map(([name, surname]) => name + ' ' + surname)
    );
  }
}