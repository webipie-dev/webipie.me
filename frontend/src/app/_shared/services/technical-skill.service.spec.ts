import { TestBed } from '@angular/core/testing';

import { TechnicalSkillService } from './technical-skill.service';

describe('TechnicalSkillService', () => {
  let service: TechnicalSkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalSkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
