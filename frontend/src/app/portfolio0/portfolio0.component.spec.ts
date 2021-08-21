import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Portfolio0Component } from './portfolio0.component';

describe('Portfolio0Component', () => {
  let component: Portfolio0Component;
  let fixture: ComponentFixture<Portfolio0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Portfolio0Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Portfolio0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
