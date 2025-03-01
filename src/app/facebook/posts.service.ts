import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

interface Post{
  user_id: string;
  titre: string;
  contenu: string;
  image?: File | null;
  date_creation: string;
}


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl = 'http://localhost/facebookAngular/createPostApi.php';

  constructor(private http: HttpClient) { }

  // Créer un post en envoyant une requête POST à l'API
  createPost(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
