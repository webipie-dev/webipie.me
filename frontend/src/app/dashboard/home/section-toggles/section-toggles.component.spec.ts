import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTogglesComponent } from './section-toggles.component';

describe('SectionTogglesComponent', () => {
  let component: SectionTogglesComponent;
  let fixture: ComponentFixture<SectionTogglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTogglesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTogglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
