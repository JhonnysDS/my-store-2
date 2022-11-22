import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/Http';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { TokenService } from './../services/token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiURL = `${environment.API_URL}/api/auth`

  constructor(
    private http: HttpClient,
    private tokenService: TokenService

  ) { }

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.apiURL}/login`, {email, password})
    .pipe(
      tap( response => this.tokenService.saveToken(response.access_token)
      )
    )
  }

  profile(token: string){
    //  let headers = new HttpHeaders();
    //  headers = headers.set('Authorization', `Bearer ${token}`)
    //  headers = headers.set('content-type', 'application/json');
    return this.http.get<User>(`${this.apiURL}/profile`);
    // headers: {
    //   Authorization: `Bearer ${token}`

    // }
  }
}
