import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { PostCard } from '../post-card';

@Component({
  selector: 'app-search-tag',
  templateUrl: './search-tag.component.html',
  styleUrls: ['./search-tag.component.scss']
})
export class SearchTagComponent implements OnInit {
  postCards: PostCard[];
  isLoaded: boolean;
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.getCards();
  }

  getCards(): void {
    const tag = this.route.snapshot.paramMap.get('tag');
    this.httpService.getPostCardsByTag(tag)
      .subscribe(data => {
        this.postCards = data;
        this.isLoaded = true; 
      });
  }

}
