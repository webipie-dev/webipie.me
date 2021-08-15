import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {EducationModel} from "../../_shared/models/education.model";

@Component({
  selector: 'app-education-section',
  templateUrl: './education-section.component.html',
  styleUrls: ['./education-section.component.scss']
})
export class EducationSectionComponent implements OnInit {
  check = faCheck;
  constructor() { }

  education?: [EducationModel]
  ngOnInit(): void {
    this.education = JSON.parse(localStorage.getItem('portfolio')!).education
  }

}
