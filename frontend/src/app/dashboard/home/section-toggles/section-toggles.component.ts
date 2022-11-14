import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { PortfolioService } from 'src/app/_shared/services/portfolio.service';
import { MultipleToggleSection } from '../../multiple-toggle-section.ts/multiple-toggle-section';

@Component({
  selector: 'app-section-toggles',
  templateUrl: './section-toggles.component.html',
  styleUrls: ['./section-toggles.component.scss']
})
export class SectionTogglesComponent extends MultipleToggleSection implements OnInit {
  @Input() section:string = "any";
  constructor(protected portfolioService: PortfolioService, protected localStorageService: LocalStorageService){
    super(portfolioService,["technicalSkills","softSkills","education","workExperiences","volunteeringExperiences","achievements","testimonials"], localStorageService);
}
  ngOnInit(): void {
  }

}
