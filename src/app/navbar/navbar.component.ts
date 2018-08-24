import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn: boolean;
  login: string;
  su: boolean;
  suMode: boolean;
  search: boolean;
  constructor(
    private sharedService: SharedService,
    private router: Router
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.sharedService.IsUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
      this.login = localStorage.getItem('currentUser');
      if (localStorage.getItem('su')) {
        this.su = true;
      }
      if (this.su == true) {
        if (this.login != localStorage.getItem('su')) {
          this.suMode = true;
        } else {
          this.suMode = false;
        }
        
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
      if ((this.su == true) && (this.login != localStorage.getItem('su'))) {
        this.suMode = true;
      }
    }
    
    
  }

  logout(): void {
    localStorage.setItem('currentUser', "");
    localStorage.setItem('su','');
    this.su = false;
    this.sharedService.IsUserLoggedIn.next(false);
    this.router.navigate(['/']);
  }

  leave() {
    localStorage.setItem('currentUser', localStorage.getItem('su'));
    this.suMode = false;
    this.sharedService.IsUserLoggedIn.next(true);
  }

  routeToUser() {
    this.router.navigateByUrl('/user/'+this.login);
  }

  keypress(key, event): void {
    if (key == ENTER) {
      this.sharedService.SearchRequest = event.target.value;
      this.sharedService.SetSearchRequest.next(true);
      this.router.navigate(['/search']);
    } 
  }

}
