import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem("user") || '{}') || null);

  public subscriptionUser() {
    return this.userData.asObservable();
  }

  public changeUser(user: User){
    this.userData.next(user);
  }

  public removeUser(){
    this.userData.next(null);
  }
}