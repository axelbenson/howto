import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { UserCard } from '../user-card';
import { PostCard } from '../post-card';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userCard: UserCard;
  postCards: PostCard[];
  isLoaded: boolean;
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit() { 
    this.getUser();
    this.getPostCards();

  }

  getUser(): void {
    const login = this.route.snapshot.paramMap.get('login');
    this.httpService.getUser(login)
      .subscribe(user => {
        this.userCard = user;
        this.isLoaded = true; 
      });
  }

  getPostCards(): void {
    const login = this.route.snapshot.paramMap.get('login');
    this.httpService.getUserPosts(login)
      .subscribe(data => this.postCards = data);
  }
}
