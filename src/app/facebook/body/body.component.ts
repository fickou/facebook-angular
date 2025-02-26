import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users.service';
import { Users } from '../users.model';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  profileForm = new FormGroup({
    prenom: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    confEmail: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    date_naissance: new FormControl(''),
    jour: new FormControl(''),
    mois: new FormControl(''),
    annee: new FormControl(''),
    sexe: new FormControl(''),
  });

  jours: number[] = [];
  mois: { value: number; nom: string }[] = [
    { value: 1, nom: 'Janvier' },
    { value: 2, nom: 'Février' },
    { value: 3, nom: 'Mars' },
    { value: 4, nom: 'Avril' },
    { value: 5, nom: 'Mai' },
    { value: 6, nom: 'Juin' },
    { value: 7, nom: 'Juillet' },
    { value: 8, nom: 'Août' },
    { value: 9, nom: 'Septembre' },
    { value: 10, nom: 'Octobre' },
    { value: 11, nom: 'Novembre' },
    { value: 12, nom: 'Décembre' },
  ];
  annees: number[] = [];

  constructor(private usersService: UsersService) {
    this.genererAnnees();
    this.genererJours();
  }

  // Validation personnalisée pour vérifier si les emails correspondent
  matchEmail(control: FormControl) {
    if (control.value !== this.profileForm.get('email')?.value) {
      return { emailMismatch: true };
    }
    return null;
  }

  // Générer les années (de l'année actuelle à 1920)
  genererAnnees() {
    const anneeActuelle = new Date().getFullYear();
    for (let i = anneeActuelle; i >= 1990; i--) {
      this.annees.push(i);
    }
  }

  // Générer les jours en fonction du mois et de l'année sélectionnés
  genererJours() {
    const anneeControl = this.profileForm.get('annee');
    const moisControl = this.profileForm.get('mois');

    if (anneeControl && moisControl && anneeControl.value && moisControl.value) {
      const annee = Number(anneeControl.value);
      const mois = Number(moisControl.value);
      const joursDansMois = new Date(annee, mois, 0).getDate();
      this.jours = Array.from({ length: joursDansMois }, (_, i) => i + 1);
    } else {
      this.jours = [];
    }
  }

  // Appelé lorsque l'utilisateur change le mois ou l'année
  onMoisOuAnneeChange() {
    this.genererJours();
  }

  // Soumettre le formulaire
  onSubmit() {
    if (this.profileForm.valid) {
      const jour = this.profileForm.get('jour')?.value;
      const mois = this.profileForm.get('mois')?.value;
      const annee = this.profileForm.get('annee')?.value;
      const date_naissance = `${annee}-${mois}-${jour}`;

      this.profileForm.patchValue({ date_naissance });

      const donneesForm = this.profileForm.value as Users;
      this.usersService.createUser(donneesForm).subscribe(
        (response) => {
          console.log('API Response:', response);
          if (response.success) {
            alert('Utilisateur créé avec succès ! ✅');
            this.profileForm.reset({
              prenom: '',
              nom: '',
              email: '',
              confEmail: '',
              password: '',
              date_naissance: '',
              jour: '',
              mois: '',
              annee: '',
              sexe: '',
            });
          } else {
            alert('Erreur : ' + response.message);
          }
        },
        (error) => {
          console.error('Erreur lors de l’insertion ❌', error);
          alert('Erreur lors de l’insertion ❌');
        }
      );
    } else {
      console.log('Formulaire invalide');
      this.profileForm.markAllAsTouched();
    }
  }
}