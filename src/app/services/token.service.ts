import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  static saveToken(access_token: string): void {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  saveToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    const token = localStorage.getItem('token' );
    return token;
  }
}
