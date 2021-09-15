import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { TemplateModel } from 'src/app/_shared/models/template.model';
import { PortfolioService } from 'src/app/_shared/services/portfolio.service';
import { TemplateService } from 'src/app/_shared/services/template.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-choose-template',
  templateUrl: './choose-template.component.html',
  styleUrls: ['./choose-template.component.scss']
})
export class ChooseTemplateComponent implements OnInit {
  arrowright = faArrowAltCircleRight;
  arrowleft = faArrowAltCircleLeft;
  positionY = 0;
  carouselwidth = 0;
  selected = new Array();
  inView = 4;
  templates = new Array();
  selectedTemplate: TemplateModel | undefined;
  @ViewChild('target',{static:true}) target ?: ElementRef<HTMLElement>;
  constructor(private templateService: TemplateService,
    private portfolioService: PortfolioService,
    private router: Router) { }


  ngOnInit(): void {
    if(window.innerWidth<700){
      this.inView = 1;
    }else if(window.innerWidth<1100){
      this.inView = 2;
    }else if(window.innerWidth<1400){
      this.inView = 3;
    }else{
      this.inView = 4;
    }
    this.templateService.getMany().subscribe(
      result => this.modify(result)
    );
    
    

  }
  modify(result:any){
    
      this.templates = result;
      this.selected.length = result.length;
      this.selected.fill(false);
      console.log(this.selected);
      if(this.target) console.log(this.carouselwidth = this.selected.length * this.target.nativeElement.offsetWidth);
    
  }
  rightArrow(el:HTMLElement){
    this.positionY += el.offsetWidth;
    if(this.positionY>el.offsetWidth * (this.selected.length-this.inView)){
      this.positionY=0;
    }
  }
  leftArrow(el:HTMLElement){
    this.positionY -= el.offsetWidth;
    if(this.positionY<0){
      this.positionY=el.offsetWidth * (this.selected.length-this.inView);
    }
  }
  select(i:number,value:boolean){

    for(let j = 0;j<this.selected.length;j++){
      this.selected[j] = false;
    }
    console.log(this.selected);
    this.selected[i]=value;
    console.log(this.selected);

    console.log(this.selected.indexOf(true));
    if(this.selected.indexOf(true)>-1){
      this.selectedTemplate = this.templates[i];
    }else{
      this.selectedTemplate = undefined;
    }


  }

  submit(){
    if(this.selectedTemplate){
      const portfolioId = localStorage.getItem('portfolioId') as string;
      if(localStorage.getItem('portfolioId')){
        this.portfolioService.changeTemplate(portfolioId, {template: this.selectedTemplate}).subscribe(
          result => {
            this.router.navigate(['dashboard']);
          }
        );
      }else{
        this.router.navigate(['templates/choose-name'], { queryParams: { templateId: this.selectedTemplate.id }});
      }
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'You must select a template to choose.',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }

  }
}