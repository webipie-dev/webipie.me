import { TestBed } from '@angular/core/testing';

import { DesignEditService } from './design-edit.service';

describe('DesignEditService', () => {
  let service: DesignEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
