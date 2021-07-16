import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedinVerifComponent } from './linkedin-verif.component';

describe('LinkedinVerifComponent', () => {
  let component: LinkedinVerifComponent;
  let fixture: ComponentFixture<LinkedinVerifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedinVerifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedinVerifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
