import { Component, OnInit } from '@angular/core';
import {TechnicalSkillService} from "../../../_shared/services/technical-skill.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TechnicalSkillModel} from "../../../_shared/models/technical-skill.model";
import {TechnicalSkillDeveloperModel} from "../../../_shared/models/technical-skill-developer";

@Component({
  selector: 'app-add-hard-skill',
  templateUrl: './add-hard-skill.component.html',
  styleUrls: ['./add-hard-skill.component.scss']
})
export class AddHardSkillComponent implements OnInit {

  constructor(private technicalSkillsService: TechnicalSkillService, private router: Router,
              private route: ActivatedRoute) { }

  // check if we are editing a testimonial or adding a new one
  edit = false;
  validForm = true;
  technicalSkill: TechnicalSkillDeveloperModel = {} as TechnicalSkillDeveloperModel;
  level = 5;
  selectedSkill: any;
  skills: TechnicalSkillModel[] = [];



  ngOnInit(): void {
    // check whether it is edit or add
    this.route.queryParams.subscribe(params => {
      if(params['technicalSkillId']) {
        this.edit = true;
        this.fillEditForm(params['technicalSkillId']);
      }
    });
    this.technicalSkillsService.getMany().subscribe(result => {
      this.skills = result;
    });
  }

  public fillEditForm(technicalSkillId: string): void {
    this.technicalSkill = (JSON.parse(localStorage.getItem('portfolio')!).technicalSkills.filter((technicalSkill: TechnicalSkillDeveloperModel) => technicalSkill.id === technicalSkillId))[0];
  }

  onSubmit() {
    if (this.selectedSkill === '') {
      this.validForm = false;
    }
    if(!this.edit) {
      this.technicalSkillsService.addOne({skill: {id: this.selectedSkill, level: this.level}}).subscribe((result) => {
        localStorage.setItem('portfolio', JSON.stringify(result))
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      });
    } else {
      this.technicalSkillsService.edit(this.technicalSkill.id, {skill: {id: this.selectedSkill, level: this.level}}).subscribe(result => {
        localStorage.setItem('portfolio', JSON.stringify(result))
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      })
    }
  }
}
