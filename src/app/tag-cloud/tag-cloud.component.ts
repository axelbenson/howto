import { Component, OnInit, ViewChild } from '@angular/core';
import { CloudData, CloudOptions, ZoomOnHoverOptions, TagCloudComponent } from 'angular-tag-cloud-module';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-tag-cloud',
  templateUrl: './tag-cloud.component.html',
  styleUrls: ['./tag-cloud.component.scss']
})
export class MyTagCloudComponent implements OnInit {
  @ViewChild(TagCloudComponent) tagCloudComponent: TagCloudComponent;

  constructor(private httpService: HttpService,
    private router: Router) { 
      this.options = {
        width : 1,
        height : 300,
        overflow: false,
        realignOnResize: true
      }
    }
      
    options: CloudOptions;

  zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.5, // Elements will become 130 % of current zize on hover
    transitionTime: 1.2, // it will take 1.2 seconds until the zoom level defined in scale property has been reached
    delay: 0.2, // Zoom will take affect after 0.8 seconds
  };
 
  data: CloudData[];

  ngOnInit() {
    this.getTags();
    window.onresize = function () {
      
    }
  }


  getTags() {
    this.httpService.getTags()
    .subscribe(data =>{
       this.data = data; 
      });
  }

  route(clicked: CloudData){
    this.router.navigate(['/search/',clicked.text]);
  }

  reDraw ()
    {
      this.tagCloudComponent.reDraw();
      
    }
}
