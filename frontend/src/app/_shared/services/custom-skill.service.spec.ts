import { TestBed } from '@angular/core/testing';

import { CustomSkillService } from './custom-skill.service';

describe('CustomSkillService', () => {
  let service: CustomSkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomSkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
