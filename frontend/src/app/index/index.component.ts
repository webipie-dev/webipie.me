import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faMouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  mouse = faMouse;
  class = '';
  constructor() { }

  ngOnInit(): void {
  }
  scroll(target:any){
    let el = document.getElementById(target);
    el!.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  onIntersection(){
    this.class = 'active';
  }
}
