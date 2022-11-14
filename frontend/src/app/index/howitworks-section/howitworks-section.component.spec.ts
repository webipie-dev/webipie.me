import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowitworksSectionComponent } from './howitworks-section.component';

describe('HowitworksSecionComponent', () => {
  let component: HowitworksSectionComponent;
  let fixture: ComponentFixture<HowitworksSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowitworksSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowitworksSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
