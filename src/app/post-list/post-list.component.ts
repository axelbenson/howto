import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { PostCard } from '../post-card';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  postCards: PostCard[];
  isLoaded: boolean;
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getPostCards();
  }

  getPostCards(): void {
    this.httpService.getPostCards()
    .subscribe(data =>{
       this.postCards = data
       this.isLoaded = true; 
      });
  }

}
