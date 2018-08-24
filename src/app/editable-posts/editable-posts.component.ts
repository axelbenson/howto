import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { SharedService } from '../shared.service';
import { PostCard } from '../post-card';
import { Response } from '../response';

@Component({
  selector: 'app-editable-posts',
  templateUrl: './editable-posts.component.html',
  styleUrls: ['./editable-posts.component.scss']
})
export class EditablePostsComponent implements OnInit {
  wait: boolean;
  postId: number;
  formData: FormData = new FormData();

  @Input() postCards: PostCard[];
  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private sharedService: SharedService
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit() {
  }

  catch(id) {
    this.postId = id;
  }

  deletePost() {
    this.wait = true;
    this.formData.append('postId',''+this.postId);
    this.httpClient.post("http://howto.ru/delete_post.php", this.formData).subscribe((data: Response)=> {
        if (data.error == "") {
          this.messageService.add({severity:'success', summary:'Succes', detail:data.success});
          this.sharedService.IsDeletedPost.next(true);
        } else {
          this.messageService.add({severity:'error', summary:'Error', detail:data.error});
        }
        if (data) {this.wait = false;}
        
      });
  }
}
