import {Component, OnInit} from '@angular/core';
import {TechnicalSkillDeveloperModel} from "../../_shared/models/technical-skill-developer";
import {SoftSkillModel} from "../../_shared/models/soft-skill.model";
import {SoftSkillService} from "../../_shared/services/soft-skill.service";
import {TechnicalSkillService} from "../../_shared/services/technical-skill.service";
import { DoubleToggleSection } from '../double-toggle-section/double-toggle-section';
import { PortfolioService } from 'src/app/_shared/services/portfolio.service';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent extends DoubleToggleSection implements OnInit {

  faUsers = 'faUsers'
  hardSkills?: [TechnicalSkillDeveloperModel];
  softSkills?: [SoftSkillModel];
  constructor(private softSkillService: SoftSkillService, private technicalSkillService: TechnicalSkillService,
    protected portfolioService: PortfolioService, private spinner: NgxSpinnerService) {
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



}
