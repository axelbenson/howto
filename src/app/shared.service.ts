import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public IsUserLoggedIn: Subject<boolean> = new Subject<boolean>();
  public IsLoaded: Subject<boolean> = new Subject<boolean>();
  public NoMoreSu: Subject<boolean> = new Subject<boolean>();
  constructor() { }
}
