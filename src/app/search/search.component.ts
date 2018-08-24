import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { SharedService } from '../shared.service';
import { PostCard } from '../post-card';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  postCards: PostCard[];
  isLoaded: boolean;
  constructor(
    private httpService: HttpService,
    private sharedService: SharedService
  ) {
      this.sharedService.SetSearchRequest.subscribe( value => {
      this.search(this.sharedService.SearchRequest);
  });
   }

  ngOnInit() {
    this.search(this.sharedService.SearchRequest);
  }

  search(request): void {
    this.isLoaded = false;
    this.httpService.search(request)
    .subscribe(data =>{
       this.postCards = data
       this.isLoaded = true; 
      });
  }

}
