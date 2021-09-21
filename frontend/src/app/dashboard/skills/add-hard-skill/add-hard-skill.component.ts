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
  level = 5;
  selectedSkill: any;
  skills: TechnicalSkillModel[] = [];



  ngOnInit(): void {
    // check whether it is edit or add
    console.log(this.selectedSkill);
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

  // handle errors
  onSubmit() {
    this.spinner.show();
    if (this.selectedSkill === '') {
      this.validForm = false;
    }
    if(!this.edit) {
      this.technicalSkillsService.addOne({skill: {id: this.selectedSkill, level: this.level}}).subscribe((result) => {
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
      this.technicalSkillsService.edit(this.technicalSkill.id, {skill: {id: this.selectedSkill, level: this.level}}).subscribe(result => {
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
      })
    }
  }
}
