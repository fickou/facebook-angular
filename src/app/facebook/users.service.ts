import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Users} from "./users.model";
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

    private selectUserApiUrl = 'http://localhost/facebookAngular/AllUserApi.php';
    private createUserApiUrl = 'http://localhost/facebookAngular/creationUserApi.php';
    private conUserApiUrl = 'http://localhost/facebookAngular/connexion.php';

      // Stocker l'utilisateur connecté
    private currentUserSubject = new BehaviorSubject<Users | null>(null);
    public $currentUser = this.currentUserSubject.asObservable();


    constructor(private http: HttpClient) { 
      if (typeof window !== 'undefined' && localStorage) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          this.currentUserSubject.next(JSON.parse(storedUser));
        }
      }
    }

  getUsers(): Observable<Users[]>{
    return this.http.get<Users[]>(this.selectUserApiUrl);
  }

  getUsersCon(): Observable<Users | null> {
    return this.$currentUser;
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
    return this.http.post(this.conUserApiUrl, { email, password }, { headers }).pipe(
      tap((response: any) => {
        if (response && response.success && response.user) {
          this.setCurrentUser(response.user); //mis à jour de l'utilsateur connecté
        }
      })
    );
  }

    private setCurrentUser(user: Users): void {
      this.currentUserSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));
    }
      

    // Récupération de l'utilisateur connecté
    getCurrentUser(): Observable<Users | null> {
      return this.$currentUser;
    }

    //déconnection
    logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
  }
}
