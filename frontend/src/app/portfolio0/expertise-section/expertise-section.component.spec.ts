import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseSectionComponent } from './expertise-section.component';

describe('ExpertiseSectionComponent', () => {
  let component: ExpertiseSectionComponent;
  let fixture: ComponentFixture<ExpertiseSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertiseSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertiseSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
