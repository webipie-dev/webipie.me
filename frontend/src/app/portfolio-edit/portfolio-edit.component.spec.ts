import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioEditComponent } from './portfolio-edit.component';

describe('PortfolioEditComponent', () => {
  let component: PortfolioEditComponent;
  let fixture: ComponentFixture<PortfolioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
