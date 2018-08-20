import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { PostCard } from '../post-card';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.scss']
})
export class RecentPostsComponent implements OnInit {
  postCards: PostCard[];
  constructor(
    private httpService: HttpService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService.IsLoaded.next(false);
    this.getPostCards();
  }

  getPostCards(): void {
    this.httpService.getRecentPostCards()
    .subscribe(data => {
      this.postCards = data;
      this.sharedService.IsLoaded.next(true);
    });
  }

}
