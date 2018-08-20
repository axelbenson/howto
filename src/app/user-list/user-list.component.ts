import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { UserCard } from '../user-card';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userCards: UserCard[];
  isLoaded: boolean;
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getUserCards();
  }

  getUserCards(): void {
    this.httpService.getUserCards()
    .subscribe(data => {
      this.userCards = data;
    this.isLoaded = true;
    });
  }
}
