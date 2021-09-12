import {Component, OnInit} from '@angular/core';
import {WorkExperienceModel} from "../../_shared/models/work-experience.model";
import {VolunteeringExperienceModel} from "../../_shared/models/volunteering-experience.model";
import {ActivatedRoute, Router} from "@angular/router";
import {SoftSkillService} from "../../_shared/services/soft-skill.service";
import {TechnicalSkillService} from "../../_shared/services/technical-skill.service";
import {VolunteeringExperienceService} from "../../_shared/services/volunteering-experience.service";
import {WorkExperienceService} from "../../_shared/services/work-experience.service";
import { DoubleToggleSection } from '../double-toggle-section/double-toggle-section';
import { PortfolioService } from 'src/app/_shared/services/portfolio.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent extends DoubleToggleSection implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
              private volunteeringExperienceService: VolunteeringExperienceService,
              private workExperienceService: WorkExperienceService, protected portfolioService: PortfolioService) {
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
    this.volunteeringExperienceService.deleteMany({ids: [id]}).subscribe(result => {
      localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
      this.ngOnInit();
    })
  }

  removeWork(id: string) {
    this.workExperienceService.deleteMany({ids: [id]}).subscribe(result => {
      localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
      this.ngOnInit();
    })
  }
}
