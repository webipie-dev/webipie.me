import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationCardComponent } from './confirmation-card.component';

describe('ConfirmationCardComponent', () => {
  let component: ConfirmationCardComponent;
  let fixture: ComponentFixture<ConfirmationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
