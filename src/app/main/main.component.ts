import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  isLoaded: boolean;
  
  constructor(private sharedService: SharedService) {
    this.sharedService.IsLoaded.subscribe( value => {
    this.isLoaded = value;
    window.onresize = function () {
      this.document.getElementById('cloud').setAttribute('style', 'width: 100%; height: 300px; background-color: black;');
      this.console.log(this.document.getElementById('cloud').style)
    }
  });
  }
  
  ngOnInit() {
  }

}
