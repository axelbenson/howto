import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn: boolean;
  login: string;
  su: boolean;
  constructor(
    private sharedService: SharedService,
    private router: Router
  ) { 
    this.sharedService.IsUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
      this.login = localStorage.getItem('currentUser');
      if (localStorage.getItem('su')) {
        this.su = true;
      }
  });
    this.sharedService.NoMoreSu.subscribe( value => {
    this.su = !value;
});
  }

  ngOnInit() {
    if (localStorage.getItem('su')) {
      this.su = true;
    }
    this.login = localStorage.getItem('currentUser');
    if (this.login) {
      this.sharedService.IsUserLoggedIn.next(true);
    }
    
  }

  logout(): void {
    localStorage.setItem('currentUser', "");
    localStorage.setItem('su','');
    this.sharedService.IsUserLoggedIn.next(false);
    this.router.navigate(['/']);
  }

}
