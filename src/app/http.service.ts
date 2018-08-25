import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CloudData } from 'angular-tag-cloud-module';
import { Observable, of } from 'rxjs';
import { PostCard } from './post-card';
import { UserCard } from './user-card';
import { UserProfile } from './user-profile';
import { Step } from './step';
import { Comment } from './comment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  formData: FormData = new FormData();

  constructor(private http: HttpClient) { }

  search(request): Observable<PostCard[]> {
    this.formData = new FormData;
    this.formData.append('request', request);
    return this.http.post<PostCard[]>("http://howto.ru/search_post.php", this.formData)
  }

  getTags(): Observable<CloudData[]> {
    return this.http.get<CloudData[]>('http://howto.ru/return_tags.php')
  }

  getComments(postId, login): Observable<Comment[]> {
    return this.http.get<Comment[]>('http://howto.ru/return_comments.php?postId='+postId+'&login='+login)
  }

  getSteps(postId,numSteps): Observable<Step[]> {
    return this.http.get<Step[]>('http://howto.ru/return_steps.php?postId='+postId+'&numSteps='+numSteps)
  }

  getPost(id): Observable<PostCard> {
    return this.http.get<PostCard>('http://howto.ru/return_post.php?id='+id)
  }

  getPostCardsByTag(tag): Observable<PostCard[]> {
    return this.http.get<PostCard[]>('http://howto.ru/search_tags.php?tag='+tag)
  }

  getPostCards(): Observable<PostCard[]> {
    return this.http.get<PostCard[]>('http://howto.ru/return_post_card.php')
  }

  getCategoryCards(category): Observable<PostCard[]> {
    return this.http.get<PostCard[]>('http://howto.ru/return_category.php?category='+category)
  }

  getRecentPostCards(): Observable<PostCard[]> {
    return this.http.get<PostCard[]>('http://howto.ru/return_recent_post_cards.php')
  }

  getTopPostCards(): Observable<PostCard[]> {
    return this.http.get<PostCard[]>('http://howto.ru/return_top_post_cards.php')
  }

  getUserPosts(login: string): Observable<PostCard[]> {
    return this.http.get<PostCard[]>('http://howto.ru/return_user_posts.php?login='+login)
  }

  getUserCards(): Observable<UserCard[]> {
    return this.http.get<UserCard[]>('http://howto.ru/return_user_card.php')
  }
  getTopUserCards(): Observable<UserCard[]> {
    return this.http.get<UserCard[]>('http://howto.ru/return_top_users.php')
  }

  getUser(login: string): Observable<UserProfile> {
    return this.http.get<UserProfile>('http://howto.ru/return_user.php'+"?login="+login)
  }

  authorize(login: string, password: string) {
    const body = {login: login, password: password}; 
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post('http://howto.ru/auth.php', body, httpOptions);
  }

  
}
