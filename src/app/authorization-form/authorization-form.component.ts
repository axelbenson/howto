import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Response } from '../response';
import { MessageService } from 'primeng/api';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-authorization-form',
  templateUrl: './authorization-form.component.html',
  styleUrls: ['./authorization-form.component.scss'],
  providers: [MessageService]
})
export class AuthorizationFormComponent implements OnInit {

  hide_modal: boolean;
  wait: boolean;
  login = new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z0-9]*')]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)] );

  constructor(
    private httpService: HttpService, 
    private messageService: MessageService,
    private sharedService: SharedService
  ) {
    
  }

  ngOnInit() {
    this.wait = false;
  }

  send() : void {
    this.wait = true;
    this.httpService.authorize(this.login.value, this.password.value).subscribe((data: Response)=> {
      if (data.error == "") {
        localStorage.setItem("currentUser", this.login.value);
        this.hide_modal = true;
        this.sharedService.IsUserLoggedIn.next(true);
      } else {
        this.messageService.add({severity:'error', summary:'Error', detail:data.error});
      }
      if (data) {this.wait = false;}
      
    }); 
  }

  keypress(key): void {
    if (key == 13) {
      this.send();
    } 
  }

}
