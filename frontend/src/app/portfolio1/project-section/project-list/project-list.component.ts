import { Component, OnInit,Input } from '@angular/core';
import { ProjectModel } from 'src/app/_shared/models/project.model';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  opened: boolean = false;
  @Input() projects : ProjectModel[] = [];

  selectedProject : any;
  currentImageIndex : number=0; 
  faGithub = faGithub;
  faLink = faLink;

  constructor() { }

  ngOnInit(): void {
    this.selectedProject = this.projects[0];
    console.log(this.projects)
  }

  resetCurrentImageIndex ():void {
    this.currentImageIndex=0 ;
  }

  selectImg(i:number):void {
    this.currentImageIndex =i;
  }

  setOpened(val: boolean): void {
    this.opened = val;
  }

  openProject(nbr: number): void {
    this.selectedProject = this.projects[nbr]
    this.resetCurrentImageIndex();
    this.setOpened(true);
  }

  closeProject(e:any):void {
    e.preventDefault();
    this.opened = false;
  }

}
