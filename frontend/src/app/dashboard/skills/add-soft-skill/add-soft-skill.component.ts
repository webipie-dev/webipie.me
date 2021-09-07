import { Component, OnInit } from '@angular/core';
import {SoftSkillModel} from "../../../_shared/models/soft-skill.model";
import {SoftSkillService} from "../../../_shared/services/soft-skill.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-soft-skill',
  templateUrl: './add-soft-skill.component.html',
  styleUrls: ['./add-soft-skill.component.scss']
})
export class AddSoftSkillComponent implements OnInit {

  constructor(private softSkillService: SoftSkillService, private router: Router,
              private route: ActivatedRoute) { }

  // check if we are editing a testimonial or adding a new one
  edit = false;
  softSkill: SoftSkillModel = {} as SoftSkillModel;
  selectedSkill: any;
  skills: SoftSkillModel[] = [];
  validForm = true;


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['softSkillId']) {
        this.edit = true;
        this.fillEditForm(params['softSkillId']);
      }
    });
    this.softSkillService.getMany().subscribe(result => {
      this.skills = result;
    })
  }

  public fillEditForm(softSkillId: string): void {
    this.softSkill = (JSON.parse(localStorage.getItem('portfolio')!).softSkills.filter((softSkill: SoftSkillModel) => softSkill.id === softSkillId))[0];
  }

  onSubmit() {
    if(this.selectedSkill === '') {
      this.validForm = false;
    }
    if(!this.edit) {
      this.softSkillService.addOne({id: this.selectedSkill}).subscribe((result) => {
        localStorage.setItem('portfolio', JSON.stringify(result))
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      }, error => {
        Swal.fire({
          title: 'Error!',
          text: error.error.errors[0].message,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      });
    } else {
      this.softSkillService.edit(this.softSkill.id, {id: this.selectedSkill}).subscribe(result => {
        localStorage.setItem('portfolio', JSON.stringify(result))
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      }, error => {
        Swal.fire({
          title: 'Error!',
          text: error.error.errors[0].message,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      })
    }
  }

  onChange() {
    console.log(this.selectedSkill)
  }
}
