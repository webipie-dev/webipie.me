import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectModel} from "../../_shared/models/project.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../_shared/services/project.service";
import { ToggleSection } from '../toggle-section/toggle-section';
import { PortfolioService } from 'src/app/_shared/services/portfolio.service';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent extends ToggleSection implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute,
              private projectService: ProjectService, protected portfolioService: PortfolioService,
              private spinner: NgxSpinnerService) {
                super(portfolioService, 'projects');
  }

  projects?: [ProjectModel]

  ngOnInit(): void {
    this.projects = JSON.parse(localStorage.getItem('portfolio')!).projects;
  }

  editProject(id: string) {
    this.router.navigate(['addproject'], { relativeTo: this.route, queryParams: { projectId: id } });
  }

  removeProject(id: string) {
    this.spinner.show();
    this.projectService.deleteMany({ids: [id]}).subscribe(result => {
      localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
      this.spinner.hide();
      this.ngOnInit();
    })
  }

  upProject(i: number){
    let aux = this.projects![i];
    this.projects![i] = this.projects![i-1]
    this.projects![i-1] = aux
  }

  downProject(i: number){
    let aux = this.projects![i];
    this.projects![i] = this.projects![i+1]
    this.projects![i+1] = aux
  }

  compareArrays(array1: any, array2: any){
    return array1.length === array2.length && array1.every((value: any, index: any) => { 
      return value._id===array2[index]._id && value.id===array2[index].id
    })
  }

  ngOnDestroy(): void {
    let portfolio: any = JSON.parse(localStorage.getItem('portfolio')!);
    let body: any = {}
    if(!this.compareArrays(this.projects, JSON.parse(localStorage.getItem('portfolio')!).projects)){ 
      body.projects = this.projects
    }
    if(Object.keys(body).length !== 0){
      this.portfolioService.edit(portfolio.id, body).subscribe(
        (result) => {
          localStorage.setItem('portfolio', JSON.stringify(result));
        }
      );
    }
  }
}
