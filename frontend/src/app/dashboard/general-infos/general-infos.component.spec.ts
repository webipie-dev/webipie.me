import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GeneralInfosComponent} from './general-infos.component';

describe('GeneralInfosComponent', () => {
  let component: GeneralInfosComponent;
  let fixture: ComponentFixture<GeneralInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralInfosComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
