import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperSimpleComponent } from './wrapper-simple.component';

describe('WrapperSimpleComponent', () => {
  let component: WrapperSimpleComponent;
  let fixture: ComponentFixture<WrapperSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
