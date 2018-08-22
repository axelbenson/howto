import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { SharedService } from '../shared.service';
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
  currentUser: string;
  self: boolean;
  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {
    this.sharedService.IsUserLoggedIn.subscribe( value => {
      if (value) {
        this.currentUser = localStorage.getItem('currentUser');
        if (this.currentUser == this.userCard.login) {
          this.self = true;
        }
      } else {
        this.self = false;
      }
  });
  }

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
        this.currentUser = localStorage.getItem('currentUser');
        if (this.currentUser == this.userCard.login) {
          this.self = true;
        } 
      });
  }

  getPostCards(): void {
    const login = this.route.snapshot.paramMap.get('login');
    this.httpService.getUserPosts(login)
      .subscribe(data => this.postCards = data);
  }
}
