import { Component, OnInit, ViewChild } from '@angular/core';
import {PageScrollConfig} from 'ng2-page-scroll';
import {MatStepper} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http';
import { UserCard } from '../user-card';
import { PostCard } from '../post-card';
import { Step } from '../step';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  
})
export class PostComponent implements OnInit {

@ViewChild('stepper') stepper: MatStepper;
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private router: Router
  ) { 
    PageScrollConfig.defaultScrollOffset = 110;
}
  post: PostCard;
  postId: string;
  user: UserCard;
  currentUser: string;
  isLoaded: boolean;
  steps: Step[];
  liked: boolean;
  isLoggedIn: boolean;
  formData: FormData = new FormData();

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.isLoaded = false;
    if (localStorage.getItem('currentUser')) {
      this.isLoggedIn = true;
      this.currentUser = localStorage.getItem('currentUser');
    }
    this.getPost();
  }

  getPost(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.httpService.getPost(id)
    .subscribe((data) => {
      if (!data.author) {
        this.router.navigate(['/main']);
      }
      this.post = data;
      this.checkStars(id,localStorage.getItem('currentUser'));
      this.getUser(this.post.author);
      this.getSteps(data.post_id, data.numSteps);
    });
    
    
  }

  checkStars(id,login) {
    this.httpClient.get('http://howto.ru/check_stars.php?post_id='+id+'&login='+login).subscribe(result => {
      if (''+result === 'true'){
        this.liked = true;
        
      }
    });   
  }

  getUser(author): void {
    this.httpService.getUser(author)
      .subscribe(user => {
        this.user = user;
       
      });
  }

  getSteps(postId, numSteps): void {
    this.httpService.getSteps(postId, numSteps)
      .subscribe(data => {
        this.steps = data;
       
        this.isLoaded = true;
      });
  }

  toggle(event): void {
    if (!event.target.closest('#panel').nextElementSibling.getAttribute('hidden')) {
      event.target.closest('#panel').nextElementSibling.setAttribute('hidden', 'true');  
    } else {
      event.target.closest('#panel').nextElementSibling.removeAttribute('hidden');
    }
  } 

  updateStars(value) {
    this.formData.append('value', value);
    this.formData.append('post_id', ''+this.post.post_id);
    this.formData.append('author', this.post.author);
    this.formData.append('login', localStorage.getItem('currentUser'));
    this.httpClient.post("http://howto.ru/update_stars.php", this.formData).subscribe(data => {
      console.log(data);
    });
    this.liked = true;
    const score = +value;
    const rait =  +this.post.raiting;
    console.log(score + rait);
    document.getElementById('postRaiting').innerHTML = "★ "+(rait+score);
  }

}
