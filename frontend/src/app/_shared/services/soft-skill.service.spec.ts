import { TestBed } from '@angular/core/testing';

import { SoftSkillService } from './soft-skill.service';

describe('SoftSkillService', () => {
  let service: SoftSkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftSkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
