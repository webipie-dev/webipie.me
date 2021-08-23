import { Component, OnInit, Renderer2 } from '@angular/core';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';

@Component({
  selector: 'app-portfolio-section',
  templateUrl: './portfolio-section.component.html',
  styleUrls: ['./portfolio-section.component.scss']
})
export class PortfolioSectionComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }
  hide(event:any){
    console.log(event.currentTarget);
    let target = event.currentTarget;
    this.renderer.setAttribute(event.currentTarget,'class','inactive');
    setTimeout(()=>{
      this.renderer.setStyle(target,'display','none');
    },1000)
  }
}
