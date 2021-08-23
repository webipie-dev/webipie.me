import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSigninComponent } from './card-signin.component';

describe('CardSigninComponent', () => {
  let component: CardSigninComponent;
  let fixture: ComponentFixture<CardSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
