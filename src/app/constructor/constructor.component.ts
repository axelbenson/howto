import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { SharedService } from '../shared.service';
import { Response } from '../response';
import {MatChipInputEvent} from '@angular/material';
import {ENTER} from '@angular/cdk/keycodes';
import { Router } from '@angular/router';

export interface Section {
  value: string;
}

export interface Tag {
  tag: string;
}

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss'],
  providers: [MessageService]
})
export class ConstructorComponent implements OnInit {
  
  sections: Section[] = [
    {value:'Hobbies & Entertainment'},
    {value:'Apartment & Cottage'},
    {value:'Sport & Fitness'},
    {value:'Internet'},
    {value:'Auto'},
    {value:'Health and Medicine'},
    {value:'Food'},
    {value:'Fashion & Style'},
    {value: 'Engineering'},
    {value: 'Other'}
  ];
  
  constructor(
    private sharedService: SharedService,
    private httpClient: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) { }
  
  counter: number;
  file_counter: number;
  step: Node;
  formData: FormData = new FormData();
  fileLoaded: boolean;
  wait: boolean;
  tags : Array<string> = [];

  name = new FormControl('', Validators.required );
  section = new FormControl('', Validators.required );
  short = new FormControl('', [Validators.required, Validators.maxLength(150)] );
  full = new FormControl('', Validators.required );
  needed = new FormControl('');

  ngOnInit() {
    if (!localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    this.step = document.getElementById('step').cloneNode(true);
    this.counter = 1;
    this.file_counter = -1;
    this.wait = false;
    this.tags = ['howto'];
    document.getElementById('head').removeAttribute('aria-controls')
    
    let inputs = document.getElementsByName('pic');
    for (let a = 0; a < inputs.length; a++) {
      inputs[a].addEventListener('change', this.onFileUpload);
    }


  }
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER];

  autogrow(event){
    let  textArea = event.target;       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  add_step(): void {
    let temp = this.step.cloneNode(true);
    this.counter = this.counter+1;
    temp.firstChild.firstChild.firstChild.firstChild.firstChild.textContent = this.counter+'';
    temp.addEventListener('keyup', this.autogrow);
    document.getElementById('add_step').parentElement.insertBefore(temp,document.getElementById('add_step'));

    let inputs = document.getElementsByName('pic');
    for (let a = 0; a < inputs.length; a++) {
      inputs[a].addEventListener('change', this.onFileUpload);
    }
  }

  handleSpacebar(ev) {
    if (ev.keyCode === 32) {
      ev.stopPropagation();
    }
   }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onFileUpload = (event: Event) => {
    this.file_counter = this.file_counter+1;
    this.fileLoaded = true;
    const target: HTMLInputElement = <HTMLInputElement>event.target;
    const files: FileList = target.files;
    target.nextElementSibling.firstElementChild.removeAttribute('hidden');
    target.nextElementSibling.children[1].setAttribute('hidden', 'true');

  
    for (let i = 0; i < files.length; i++) {
      this.formData.append('file'+this.file_counter, files[i]);
    }
  }

  send(): void {
    this.wait = true;
    this.formData.append('name', this.name.value);
    this.formData.append('section', this.section.value);
    this.formData.append('short', this.short.value);
    this.formData.append('full', this.full.value);
    this.formData.append('needed', this.needed.value);
    this.formData.append('tags', this.tags.toString());
    this.formData.append('numSteps', ''+this.counter);
    this.formData.append('author', localStorage.getItem('currentUser'));
  
    for (let a = 0; a < this.counter; a++)
    {
      let node = <HTMLInputElement>(document.getElementById('form10'))
      this.formData.append('stepDesc'+(a+1), node.value);
      document.getElementById('form10').setAttribute('id','form1');
    }

    for (let a = 0; a < this.counter; a++)
    {
      let node = <HTMLInputElement>(document.getElementById('form-step-name'))
      this.formData.append('stepName'+(a+1), node.value);
      document.getElementById('form-step-name').setAttribute('id','form1');
    }
    
  
    this.httpClient.post("http://howto.ru/upload_instruction.php", this.formData).subscribe((data: Response)=> {
        if (data.error == "") {
          this.messageService.add({severity:'success', summary:'Succes', detail:data.success});
          this.router.navigate(['/user/'+localStorage.getItem('currentUser')]);
        } else {
          this.messageService.add({severity:'error', summary:'Error', detail:data.error});
        }
        if (data) {this.wait = false;}
        
      });
     
   
  }
}
