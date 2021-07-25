import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebipiemeComponent } from './webipieme.component';

describe('WebipiemeComponent', () => {
  let component: WebipiemeComponent;
  let fixture: ComponentFixture<WebipiemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebipiemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebipiemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
