import { Component, OnInit, ViewChild } from '@angular/core';
import {Users} from '../users.model';
import {UsersService} from '../users.service';
import {CommonModule} from '@angular/common';
import { Router } from '@angular/router'; 
import { PostsService } from '../posts.service';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-posts',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  
  userProfile: Users | null = null;
  @ViewChild('fileInput') fileInput: any;
  FormulairePost : FormGroup;
  listeAmi: Users[] = [];

  afficherForm = false;
  contenuPost = '';
  fichierMedia: File | null = null;
  
    constructor(private usersService:UsersService, private router: Router,  private postsService: PostsService, private fb: FormBuilder){
      this.FormulairePost = this.fb.group({
        titre: ['', Validators.required],
        contenu: ['', Validators.required],
        image: [null]
      });
    }
  
    ngOnInit() {
      this.usersService.getUsers().subscribe(data => {
        this.listeAmi = data;
      });
      this.usersService.getUsersCon().subscribe(user => {
        if (user) {
          this.userProfile = user;
          if (this.userProfile) {
            console.log('ID de l’utilisateur connecté :', this.userProfile.id);
          }
        } 
      });
    }

    //deconnexion
    deconnexion() {
      this.usersService.logout();
      this.router.navigate(['facebook']);
    }

    publierPost() {
      if (this.FormulairePost.valid && this.userProfile) {
        const formData = new FormData();
        formData.append('user_id', this.userProfile.id?.toString() || '');
        formData.append('titre', this.FormulairePost.value.titre);
        formData.append('contenu', this.FormulairePost.value.contenu);
        formData.append('date_creation', new Date().toISOString());
    
        const image = this.FormulairePost.get('image')?.value;
        if (image) {
          formData.append('image', image);
        }
    
        console.log("Données du post : ", formData);
    
        this.postsService.createPost(formData).subscribe(
          (response) => {
            console.log('Publication réussie', response);
            this.afficherForm = false;
            this.FormulairePost.reset();
          },
          (error) => {
            console.error('Erreur lors de la publication', error);
          }
        );
      } else {
        console.log('Formulaire invalide ou utilisateur non connecté');
      }
    }
    

    ajouterMedia(event: Event) {
      const files = event.target as HTMLInputElement;
      if (files && files.files) {
          const file = files.files;
          console.log('Fichier sélectionné:', file);
      }
  }
}
