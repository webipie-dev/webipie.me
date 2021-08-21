import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {EducationService} from "../../../_shared/services/education.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.scss']
})
export class AddEducationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private educationService: EducationService,
              private router: Router, private route: ActivatedRoute) {
  }


  educationForm = this.formBuilder.group({
    title: ['', Validators.required],
    level: ['', Validators.required],
    beginDate: ['', Validators.required],
    endDate: [''],
    city: ['']
  });

  ngOnInit(): void {
  }

  onSubmit() {
    this.educationService.addOne(this.educationForm.value).subscribe((result) => {
      localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
      this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r))
    });
  }
}
