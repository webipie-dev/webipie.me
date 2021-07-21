import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-project-element',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit,OnChanges {
  constructor() { }
  @Input() globalTag = "All";
  @Input() tags = ["none"];
  class = "cos-container";
  compare = true;
  ngOnInit(): void {
  }
  ngOnChanges(changes: any) {
    this.compare = this.tags.includes(this.globalTag);
    if(!this.compare){
        this.class="cos-container inactive";
        setTimeout(()=>{
          this.class="cos-container inactive invisible";
        },1000)
    }else{
      this.class="cos-container";
    }
  }
}
