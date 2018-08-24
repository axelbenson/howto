import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostCard } from '../post-card';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  postCards: PostCard[];
  isLoaded: boolean;
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.getPostCards();
  }

  getPostCards(): void {
    const category = this.route.snapshot.paramMap.get('category');
    this.httpService.getCategoryCards(category)
    .subscribe(data => {
      this.postCards = data;
      this.isLoaded = true;
    });
  }

}
