import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {EducationModel} from "../../_shared/models/education.model";
import {EducationService} from "../../_shared/services/education.service";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  constructor(private educationService: EducationService, private router: Router, private route: ActivatedRoute) {
  }

  educationList?: [EducationModel];

  ngOnInit(): void {
    this.educationList = JSON.parse(localStorage.getItem('portfolio')!).education;
  }

  editEducation(id: string) {
    this.router.navigate(['addeducation'], { relativeTo: this.route, queryParams: { educationId: id } });
  }


  removeEducation(id: string) {
    this.educationService.deleteMany({ids: [id]}).subscribe(result => {
      localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
      this.ngOnInit();
    })
  }
}
