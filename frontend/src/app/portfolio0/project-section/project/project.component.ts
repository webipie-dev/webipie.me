import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import {ProjectModel} from "../../../_shared/models/project.model";

@Component({
  selector: 'app-project-element',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit,OnChanges {
  constructor() { }
  @Input() globalTag = "All";
  @Input() tags? = ["none"];
  @Input() project?: ProjectModel;
  class = "cos-container";
  compare = true;
  ngOnInit(): void {
    console.log(this.project)
  }
  ngOnChanges(changes: any) {
    // to be changed when filtering
    this.compare = true;
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
