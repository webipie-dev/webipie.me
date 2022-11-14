import { Component, Input, OnInit } from '@angular/core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent implements OnInit {
  overlay = false;
  linkedin = faLinkedin;
  github = faGithub;
  @Input() member: any;
   constructor() { }

  ngOnInit(): void {
  }
  hover(e:any,b:boolean){
    this.overlay = b;
  }
}
