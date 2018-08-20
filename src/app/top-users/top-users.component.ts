import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { UserCard } from '../user-card';

@Component({
  selector: 'app-top-users',
  templateUrl: './top-users.component.html',
  styleUrls: ['./top-users.component.scss']
})
export class TopUsersComponent implements OnInit {
  userCards: UserCard[];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getUserCards();
  }

  getUserCards(): void {
    this.httpService.getTopUserCards()
    .subscribe(data => this.userCards = data);
  }
}
