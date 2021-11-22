import {Component, OnDestroy, OnInit} from '@angular/core';
import {WorkExperienceModel} from "../../_shared/models/work-experience.model";
import {VolunteeringExperienceModel} from "../../_shared/models/volunteering-experience.model";
import {ActivatedRoute, Router} from "@angular/router";
import {VolunteeringExperienceService} from "../../_shared/services/volunteering-experience.service";
import {WorkExperienceService} from "../../_shared/services/work-experience.service";
import { DoubleToggleSection } from '../double-toggle-section/double-toggle-section';
import { PortfolioService } from 'src/app/_shared/services/portfolio.service';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent extends DoubleToggleSection implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute,
              private volunteeringExperienceService: VolunteeringExperienceService,
              private workExperienceService: WorkExperienceService, protected portfolioService: PortfolioService,
              private spinner: NgxSpinnerService) {
                super(portfolioService, 'workExperiences', 'volunteeringExperiences')
  }

  workExperiences?: [WorkExperienceModel];
  volunteeringExperiences?: [VolunteeringExperienceModel];

  ngOnInit(): void {
    this.workExperiences = JSON.parse(localStorage.getItem('portfolio')!).workExperiences;
    this.volunteeringExperiences = JSON.parse(localStorage.getItem('portfolio')!).volunteeringExperiences;
  }

  editWork(id: string) {
    this.router.navigate(['addexperience'], { relativeTo: this.route, queryParams: { workId: id } });
  }

  editVolunteer(id: string) {
    this.router.navigate(['addvolunteer'], { relativeTo: this.route, queryParams: { volunteerId: id } });
  }

  removeVolunteer(id: string) {
    this.spinner.show();
    this.volunteeringExperienceService.deleteMany({ids: [id]}).subscribe(result => {
      localStorage.setItem('portfolio', JSON.stringify(result.portfolio));
      this.spinner.hide();
      this.ngOnInit();
    })
  }

  removeWork(id: string) {
    this.spinner.show();
    this.workExperienceService.deleteMany({ids: [id]}).subscribe(result => {
      localStorage.setItem('portfolio', JSON.stringify(result.portfolio));
      this.spinner.hide();
      this.ngOnInit();
    })
  }

  upExperience(i: number, type: any){
    if(type == "work"){
      let aux = this.workExperiences![i];
      this.workExperiences![i] = this.workExperiences![i-1]
      this.workExperiences![i-1] = aux
    }else if(type == "volunteer"){
      let aux = this.volunteeringExperiences![i];
      this.volunteeringExperiences![i] = this.volunteeringExperiences![i-1]
      this.volunteeringExperiences![i-1] = aux
    }
  }

  downExperience(i: number, type: any){
    if(type == "work"){
      let aux = this.workExperiences![i];
      this.workExperiences![i] = this.workExperiences![i+1]
      this.workExperiences![i+1] = aux
    }else if(type == "volunteer"){
      let aux = this.volunteeringExperiences![i];
      this.volunteeringExperiences![i] = this.volunteeringExperiences![i+1]
      this.volunteeringExperiences![i+1] = aux
    }
  }

  compareArrays(array1: any, array2: any){
    return array1.length === array2.length && array1.every((value: any, index: any) => { 
      return value._id===array2[index]._id && value.id===array2[index].id
    })
  }

  ngOnDestroy(): void {
    let portfolio: any = JSON.parse(localStorage.getItem('portfolio')!);
    let body: any = {}
    if(!this.compareArrays(this.workExperiences, JSON.parse(localStorage.getItem('portfolio')!).workExperiences)){ 
      body.workExperiences = this.workExperiences
    }
    if(!this.compareArrays(this.volunteeringExperiences, JSON.parse(localStorage.getItem('portfolio')!).volunteeringExperiences)){ 
      body.volunteeringExperiences = this.volunteeringExperiences
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
