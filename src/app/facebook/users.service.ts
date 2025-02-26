import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Users} from "./users.model";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    // URL API pour récupérer les utilisateurs
    private selectUserApiUrl = 'http://localhost/facebookAngular/AllUserApi.php';
    private createUserApiUrl = 'http://localhost/facebookAngular/creationUserApi.php';
    private conUserApiUrl = 'http://localhost/facebookAngular/connexion.php';


  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users[]>{
    return this.http.get<Users[]>(this.selectUserApiUrl);
  }

  getUsersCon(): Observable<Users[]>{
    return this.http.get<Users[]>(this.conUserApiUrl);
  }

  createUser(user: Users): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    return this.http.post(this.createUserApiUrl, user, { headers });
  }

  connexionUser(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    return this.http.post(this.conUserApiUrl, {email, password}, { headers });
  }
}
