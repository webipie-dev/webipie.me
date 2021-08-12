  
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-portfolio-section',
  templateUrl: './portfolio-section.component.html',
  styleUrls: ['./portfolio-section.component.scss']
})
export class PortfolioSectionComponent implements OnInit {
  globalTag="All";
  constructor(private renderer: Renderer2) { }
  projects = [['All','Design','Photoshop'],['All','Design'],['All','Illustrator','Indesign'],['All','Illustrator'],['All','Design'],['All','Design']];
  ngOnInit(): void {
  }
  changeTag(s:string){
    this.globalTag = s;
    console.log(s);
  }
}