import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Localization } from './localization';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  public subject = new Subject<any>();
  ui: Localization;
  constructor(private httpService: HttpService) { }

  getLanguage(language) {
    this.httpService.getLanguage(language).subscribe( (ui: Localization) => {
      this.ui = ui;
      this.subject.next(this.ui);
      
  });
  }
}
