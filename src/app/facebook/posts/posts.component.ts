import { Component } from '@angular/core';
import {Users} from '../users.model';
import {UsersService} from '../users.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-posts',
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  listeUsers: Users[] = [];
  
    constructor(private usersService:UsersService){}
  
    ngOnInit(){
      this.getListeUsersApi();
    }
  
    getListeUsersApi() {
      this.usersService.getUsersCon().subscribe({
        next: (data) => {
          console.log("Réponse API :", data);
          this.listeUsers = data;
        },
        error: (error) => {
          console.error("Erreur API :", error);
        }
      });
    }    
}
