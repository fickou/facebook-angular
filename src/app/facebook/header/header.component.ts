import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from '../users.model';
import { UsersService } from '../users.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  listeUsers: Users[] = [];
  profilForm: FormGroup;

  constructor(private usersService: UsersService, private router: Router) {
    // Initialisation correcte du formulaire avec updateOn: 'change'
    this.profilForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: 'change' }),
      password: new FormControl('', { validators: [Validators.required], updateOn: 'change' })
    });
  }

  ngOnInit() {
    
  }

  isFormInvalid(): boolean {
    return this.profilForm.invalid;
  }

  onSubmit() {
    if (this.profilForm.valid) {
      const email = this.profilForm.get('email')?.value ?? '';
      const password = this.profilForm.get('password')?.value ?? '';

      this.usersService.connexionUser(email, password).subscribe(
        (response) => {
          console.log('Réponse API:', response);
          if (response.success) {
            alert('Connexion réussie ! ✅');
            this.profilForm.reset();
            /**redirection vers la page posts */
            this.router.navigate(['facebook/posts']);
            
          } else {
            alert('Erreur : ' + response.message);
          }
        },
        (error) => {
          console.error('Erreur lors de la connexion ❌:', error);
          alert('Erreur lors de la connexion ❌');
        }
      );
    } else {
      console.log('Formulaire invalide');
      this.profilForm.markAllAsTouched();
    }
  }
}
