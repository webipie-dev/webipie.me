import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddSoftSkillComponent} from './add-soft-skill.component';

describe('AddSoftSkillComponent', () => {
  let component: AddSoftSkillComponent;
  let fixture: ComponentFixture<AddSoftSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSoftSkillComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSoftSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
