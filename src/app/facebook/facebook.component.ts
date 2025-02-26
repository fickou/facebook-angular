import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Users} from "./users.model";
import {UsersService} from "./users.service";
import { HeaderComponent } from "./header/header.component";
import { BodyComponent } from "./body/body.component";

@Component({
  selector: 'app-facebook',
  imports: [CommonModule, HeaderComponent, BodyComponent],
  templateUrl: './facebook.component.html',
  styleUrl: './facebook.component.css'
})
export class FacebookComponent {
  listeUsers: Users[] = [];

  constructor(private usersService:UsersService){}

  ngOnInit(){
    this.getListeUsersApi();
  }

  getListeUsersApi(){
    this.usersService.getUsers().subscribe(data => {
      this.listeUsers = data;
    });
  }
}
