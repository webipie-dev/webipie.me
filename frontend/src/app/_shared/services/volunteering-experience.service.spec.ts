import { TestBed } from '@angular/core/testing';

import { VolunteeringExperienceService } from './volunteering-experience.service';

describe('VolunteeringExperienceService', () => {
  let service: VolunteeringExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolunteeringExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
