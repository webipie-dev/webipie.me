import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardConsentComponent } from './card-consent.component';

describe('CardConsentComponent', () => {
  let component: CardConsentComponent;
  let fixture: ComponentFixture<CardConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardConsentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
