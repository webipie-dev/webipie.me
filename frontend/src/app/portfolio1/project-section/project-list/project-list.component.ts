import { Component, OnInit,Input } from '@angular/core';
import { ProjectModel } from 'src/app/_shared/models/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  opened: boolean = false;
  @Input() projects : ProjectModel[] = [];

  selectedProject : any;

  constructor() { }

  ngOnInit(): void {
    this.selectedProject = this.projects[0];
  }

  setOpened(val: boolean): void {
    this.opened = val;
  }

  openProject(nbr: number): void {
    console.log(nbr)
    this.selectedProject = this.projects[nbr]
    this.setOpened(true);
  }

  closeProject(e:any):void {
    e.preventDefault();
    this.opened = false;
  }

}
