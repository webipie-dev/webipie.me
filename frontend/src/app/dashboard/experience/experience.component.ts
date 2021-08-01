import {Component, OnInit} from '@angular/core';
import {WorkExperienceModel} from "../../_shared/models/work-experience.model";
import {VolunteeringExperienceModel} from "../../_shared/models/volunteering-experience.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
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
}
