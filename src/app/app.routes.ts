import { Routes } from '@angular/router';
import { FacebookComponent } from './facebook/facebook.component';
import { HeaderComponent } from './facebook/header/header.component';
import { BodyComponent } from './facebook/body/body.component';
import { PostsComponent } from './facebook/posts/posts.component';

export const routes: Routes = [
    { path: 'facebook', component: FacebookComponent },
    { path: 'facebook/header', component: HeaderComponent },
    {path: 'facebook/body', component: BodyComponent},
    {path: 'facebook/posts', component: PostsComponent},
    /**route par defaut */
    { path: '', redirectTo: 'facebook', pathMatch: 'full' }
];
