import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from 'src/app/_shared/services/portfolio.service';
import {EducationModel} from "../../_shared/models/education.model";
import {EducationService} from "../../_shared/services/education.service";
import { ToggleSection } from '../toggle-section/toggle-section';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent extends ToggleSection implements OnInit, OnDestroy {
  constructor(private educationService: EducationService, private router: Router,
              private route: ActivatedRoute, protected portfolioService: PortfolioService,
              private spinner: NgxSpinnerService) {
    super(portfolioService, 'education');
  }

  educationList?: [EducationModel];

  ngOnInit(): void {
    this.educationList = JSON.parse(localStorage.getItem('portfolio')!).education;
  }

  editEducation(id: string) {
    this.router.navigate(['addeducation'], { relativeTo: this.route, queryParams: { educationId: id } });
  }


  removeEducation(id: string) {
    this.spinner.show();
    this.educationService.deleteMany({ids: [id]}).subscribe(result => {
      localStorage.setItem('portfolio', JSON.stringify(result.portfolio));
      this.spinner.hide();
      this.ngOnInit();
    })
  }

  upEducation(i: number){
    let aux = this.educationList![i];
    this.educationList![i] = this.educationList![i-1]
    this.educationList![i-1] = aux
  }

  downEducation(i: number){
    let aux = this.educationList![i];
    this.educationList![i] = this.educationList![i+1]
    this.educationList![i+1] = aux
  }

  compareArrays(array1: any, array2: any){
    return array1.length === array2.length && array1.every((value: any, index: any) => { 
      return value._id===array2[index]._id && value.id===array2[index].id
    })
  }

  ngOnDestroy(): void {
    let portfolio: any = JSON.parse(localStorage.getItem('portfolio')!);
    let body: any = {}
    if(!this.compareArrays(this.educationList, JSON.parse(localStorage.getItem('portfolio')!).education)){ 
      body.education = this.educationList
    }
    if(Object.keys(body).length !== 0){
      this.portfolioService.edit(portfolio.id, body).subscribe(
        (result) => {
          localStorage.setItem('portfolio', JSON.stringify(result));
        }
      );
    }
  }
}
