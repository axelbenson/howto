import { Component, OnInit, Input, Output } from '@angular/core';
import { PostCard } from '../post-card';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  @Input() postCards: PostCard[];
  constructor() { }

  ngOnInit() {
  }

}
