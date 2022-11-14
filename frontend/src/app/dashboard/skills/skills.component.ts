import {Component, OnDestroy, OnInit} from '@angular/core';
import {TechnicalSkillDeveloperModel} from "../../_shared/models/technical-skill-developer";
import {SoftSkillModel} from "../../_shared/models/soft-skill.model";
import {SoftSkillService} from "../../_shared/services/soft-skill.service";
import {TechnicalSkillService} from "../../_shared/services/technical-skill.service";
import { DoubleToggleSection } from '../double-toggle-section/double-toggle-section';
import { PortfolioService } from 'src/app/_shared/services/portfolio.service';
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent extends DoubleToggleSection implements OnInit, OnDestroy {

  faUsers = 'faUsers'
  hardSkills?: [TechnicalSkillDeveloperModel];
  softSkills?: [SoftSkillModel];
  constructor(private softSkillService: SoftSkillService, private technicalSkillService: TechnicalSkillService,
              protected portfolioService: PortfolioService, private spinner: NgxSpinnerService, private router: Router,
              private route: ActivatedRoute) {
      super(portfolioService, 'technicalSkills', 'softSkills')
  }


  ngOnInit(): void {
    this.hardSkills = JSON.parse(localStorage.getItem('portfolio')!).technicalSkills;
    this.softSkills = JSON.parse(localStorage.getItem('portfolio')!).softSkills;
  }

  removeSoftSkill(id: string) {
    this.spinner.show();
    this.softSkillService.deleteMany({ids: [id]}).subscribe(result => {
      localStorage.setItem('portfolio', JSON.stringify(result));
      this.spinner.hide();
      this.ngOnInit();
    })
  }

  removeTechnicalSkill(id: string) {
    this.spinner.show();
    this.technicalSkillService.deleteMany({ids: [id]}).subscribe(result => {
      localStorage.setItem('portfolio', JSON.stringify(result));
      this.spinner.hide();
      this.ngOnInit();
    })
  }


  editHardSkill(id: string) {
    this.router.navigate(['addhardskill'], { relativeTo: this.route, queryParams: { hardSkillId: id } });
  }

  upSkill(i: number, skill: any){
    if(skill == "hard"){
      let aux = this.hardSkills![i];
      this.hardSkills![i] = this.hardSkills![i-1]
      this.hardSkills![i-1] = aux
    }else if(skill == "soft"){
      let aux = this.softSkills![i];
      this.softSkills![i] = this.softSkills![i-1]
      this.softSkills![i-1] = aux
    }
  }

  downSkill(i: number, skill: any){
    if(skill == "hard"){
      let aux = this.hardSkills![i];
      this.hardSkills![i] = this.hardSkills![i+1]
      this.hardSkills![i+1] = aux
    }else if(skill == "soft"){
      let aux = this.softSkills![i];
      this.softSkills![i] = this.softSkills![i+1]
      this.softSkills![i+1] = aux
    }
  }

/*   shallowEqual(object1: any, object2: any): any {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if(typeof object1[key] == "object"){
        this.shallowEqual(object1[key], object2[key])
      }
      else if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  } */

  compareArrays(array1: any, array2: any){
    return array1.length === array2.length && array1.every((value: any, index: any) => { 
      //return this.shallowEqual(value,array2[index])})
      return value._id===array2[index]._id && value.id===array2[index].id
    })
  }

  ngOnDestroy(): void {
    let portfolio: any = JSON.parse(localStorage.getItem('portfolio')!);
    let body: any = {}
    if(!this.compareArrays(this.hardSkills, JSON.parse(localStorage.getItem('portfolio')!).technicalSkills)){ 
      body.technicalSkills = this.hardSkills
    }
    if(!this.compareArrays(this.softSkills, JSON.parse(localStorage.getItem('portfolio')!).softSkills)){ 
      body.softSkills = this.softSkills
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
