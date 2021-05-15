import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenstorageService {

 
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(token:any): any {
    if(token!=null){
 
      // decode the token to read the username and expiration timestamp
      const token_parts =token.split(/\./);
      const token_decoded = JSON.parse(window.atob(token_parts[1]));
     // this.token_expires = new Date(token_decoded.exp * 1000);
     return token_decoded.username
   //   this.username = token_decoded.username;
      }
  /*  const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }*/

    return {};
  }
}