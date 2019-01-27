import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn = new BehaviorSubject<boolean>(this.token.isLoggedIn());
  authStatus = this.loggedIn.asObservable();

  constructor(private token: TokenService) { }

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }
}
