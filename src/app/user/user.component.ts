import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { SharedService } from '../shared.service';
import { UserProfile } from '../user-profile';
import { PostCard } from '../post-card';
import { Response } from '../response';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userCard: UserProfile;
  postCards: PostCard[];
  isLoaded: boolean;
  currentUser: string;
  self: boolean;
  wait: boolean;
  laurel: boolean;
  champion: boolean;
  star: boolean;
  beginner: boolean;
  commentator: boolean;

  constructor(
    
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private messageService: MessageService,
    private httpService: HttpService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
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
  this.sharedService.IsDeletedPost.subscribe( value => {
    if (value) {
      this.getPostCards();
    } 
});
  }
  formData: FormData = new FormData();
  name = new FormControl('');
  age = new FormControl('');
  location = new FormControl('');

  ngOnInit() { 
    this.getUser();
    this.getPostCards();

  }

  getUser(): void {
    const login = this.route.snapshot.paramMap.get('login');
    this.httpService.getUser(login)
      .subscribe(user => {
        if (!user.login) {
          this.router.navigate(['/main']);
        }
        this.userCard = user;
        this.isLoaded = true; 
        this.currentUser = localStorage.getItem('currentUser');
        if (user.beginner == "true") { this.beginner = true; }
        if (user.laurel == "true") { this.laurel = true; }
        if (user.star == "true") { this.star = true; }
        if (user.champion == "true") { this.champion = true; }
        if (user.commentator == "true") { this.commentator = true; }
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

  onFileUpload = (event: Event) => {
    const target: HTMLInputElement = <HTMLInputElement>event.target;
    const files: FileList = target.files;
    target.nextElementSibling.firstElementChild.removeAttribute('hidden');
    target.nextElementSibling.children[1].setAttribute('hidden', 'true');
    for (let i = 0; i < files.length; i++) {
      this.formData.append('file', files[i]);
    }
  }

  clean() {
    this.formData = new FormData;
  }

  send(): void {
    this.wait = true;
    this.formData.append('id', ''+this.userCard.id);
    if (!this.name.value){
      this.formData.append('name', this.userCard.name);
    } else {
      this.formData.append('name', this.name.value);
    }
    if (!this.age.value){
      this.formData.append('age', ''+this.userCard.age);
    } else {
      this.formData.append('age', this.age.value);
    }
    if (!this.location.value){
      this.formData.append('location', this.userCard.location);
    } else {
      this.formData.append('location', this.location.value);
    }
    this.httpClient.post("http://howto.ru/edit_user.php", this.formData).subscribe((data: Response)=> {
        if (data.error == "") {
          this.messageService.add({severity:'success', summary:'Succes', detail:data.success});
          this.getUser();
        } else {
          this.messageService.add({severity:'error', summary:'Error', detail:data.error});
        }
        if (data) {this.wait = false;}
        
      });
     
   
  }
}
