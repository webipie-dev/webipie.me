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
  @Input() name = "John Doe";
  @Input() position = "Web Developer";
  @Input() picture = "assets/johndoe.jpg";
  @Input() githublink = "#";
  @Input() linkedinlink = "#";
  @Input() description = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum fuga repellendus reprehenderit accusamus voluptatem, natus, doloribus quaerat quo molestias."
  constructor() { }

  ngOnInit(): void {
  }
  hover(e:any,b:boolean){
    this.overlay = b;
  }
}
