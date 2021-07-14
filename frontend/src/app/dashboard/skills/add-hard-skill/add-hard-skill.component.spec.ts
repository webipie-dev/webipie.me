import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHardSkillComponent } from './add-hard-skill.component';

describe('AddHardSkillComponent', () => {
  let component: AddHardSkillComponent;
  let fixture: ComponentFixture<AddHardSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHardSkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHardSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
