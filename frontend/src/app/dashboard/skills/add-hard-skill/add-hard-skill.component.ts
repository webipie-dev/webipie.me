import { Component, OnInit } from '@angular/core';
import {TechnicalSkillService} from "../../../_shared/services/technical-skill.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TechnicalSkillModel} from "../../../_shared/models/technical-skill.model";
import {TechnicalSkillDeveloperModel} from "../../../_shared/models/technical-skill-developer";
import Swal from "sweetalert2";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-hard-skill',
  templateUrl: './add-hard-skill.component.html',
  styleUrls: ['./add-hard-skill.component.scss']
})
export class AddHardSkillComponent implements OnInit {

  constructor(private technicalSkillsService: TechnicalSkillService, private router: Router,
              private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  // check if we are editing a testimonial or adding a new one
  edit = false;
  validForm = true;
  technicalSkill: TechnicalSkillDeveloperModel = {} as TechnicalSkillDeveloperModel;

  selectLevel : boolean = true ;
  level = 5;
  selectedSkill: any = null;
  skills: TechnicalSkillModel[] = [];



  ngOnInit(): void {
    // check whether it is edit or add
    this.route.queryParams.subscribe(params => {
      if(params['hardSkillId']) {
        this.edit = true;
        this.fillEditForm(params['hardSkillId']);
      }
    });
    this.technicalSkillsService.getMany().subscribe(result => {
      this.skills = result;
      if(this.edit) {
        // selected skill should take the id of the hard skill
        this.selectedSkill = this.skills.filter((value: TechnicalSkillModel) => value.id === this.technicalSkill.skill.id)[0].id;
        console.log(this.selectedSkill)
      }

    });
  }

  public fillEditForm(technicalSkillId: string): void {
    this.technicalSkill = (JSON.parse(localStorage.getItem('portfolio')!).technicalSkills.filter((technicalSkill: TechnicalSkillDeveloperModel) => technicalSkill._id === technicalSkillId))[0];
    this.level = this.technicalSkill.level;
  }

  // handle errors
  onSubmit() {
    this.spinner.show();
    if (this.selectedSkill === '') {
      this.validForm = false;
    }
    if(!this.edit) {
      this.technicalSkillsService.addOne({skill: {id: this.selectedSkill, level: this.selectLevel? this.level: undefined}}).subscribe((result) => {
        localStorage.setItem('portfolio', JSON.stringify(result));
        this.spinner.hide();
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      }, error => {
        this.spinner.hide();
        Swal.fire({
          title: 'Error!',
          text: error.error.errors[0].message,
          icon: 'error',
          confirmButtonText: 'Okay',
          footer: '<a href="/dashboard/support-request">Contact Support</a>'
        });
      });
    } else {
      this.technicalSkillsService.edit(this.technicalSkill._id, {id: this.selectedSkill, level: this.selectLevel?this.level: undefined}).subscribe(result => {
        localStorage.setItem('portfolio', JSON.stringify(result.portfolio));
        this.spinner.hide();
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      }, error => {
        this.spinner.hide();
        Swal.fire({
          title: 'Error!',
          text: error.error.errors[0].message,
          icon: 'error',
          confirmButtonText: 'Okay',
          footer: '<a href="/dashboard/support-request">Contact Support</a>'
        });
      })
    }
  }

  setCleared() {
    this.validForm = false;
  }
}
