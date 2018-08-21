import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn: boolean;
  login: string;
  constructor(
    private sharedService: SharedService
  ) { 
    this.sharedService.IsUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
      this.login = localStorage.getItem('currentUser');
  });
  }

  ngOnInit() {
    this.login = localStorage.getItem('currentUser');
    if (this.login) {
      this.sharedService.IsUserLoggedIn.next(true);
    }
    
  }

  logout(): void {
    localStorage.setItem('currentUser', "");
    this.sharedService.IsUserLoggedIn.next(false);
  }

}
