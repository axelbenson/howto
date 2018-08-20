import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PostCard } from './post-card';
import { UserCard } from './user-card';
import { Step } from './step';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getSteps(postId,numSteps): Observable<Step[]> {
    return this.http.get<Step[]>('http://howto.ru/return_steps.php?postId='+postId+'&numSteps='+numSteps)
  }

  getPost(id): Observable<PostCard> {
    return this.http.get<PostCard>('http://howto.ru/return_post.php?id='+id)
  }

  getPostCards(): Observable<PostCard[]> {
    return this.http.get<PostCard[]>('http://howto.ru/return_post_card.php')
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

  getUser(login: string): Observable<UserCard> {
    return this.http.get<UserCard>('http://howto.ru/return_user.php'+"?login="+login)
  }

  authorize(login: string, password: string) {
    const body = {login: login, password: password}; 
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post('http://howto.ru/auth.php', body, httpOptions);
  }

  
}
