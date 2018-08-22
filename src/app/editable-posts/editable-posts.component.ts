import { Component, OnInit, Input, Output } from '@angular/core';
import { PostCard } from '../post-card';

@Component({
  selector: 'app-editable-posts',
  templateUrl: './editable-posts.component.html',
  styleUrls: ['./editable-posts.component.scss']
})
export class EditablePostsComponent implements OnInit {

  @Input() postCards: PostCard[];
  constructor() { }

  ngOnInit() {
  }

}
