import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { PostCard } from '../post-card';

@Component({
  selector: 'app-top-posts',
  templateUrl: './top-posts.component.html',
  styleUrls: ['./top-posts.component.scss']
})
export class TopPostsComponent implements OnInit {
  postCards: PostCard[];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getPostCards();
  }

  getPostCards(): void {
    this.httpService.getTopPostCards()
    .subscribe(data => this.postCards = data);
  }

}
