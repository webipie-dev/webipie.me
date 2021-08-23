import { TestBed } from '@angular/core/testing';

import { LoginAuthGuardService } from './login-auth-guard.service';

describe('LoginAuthGuardService', () => {
  let service: LoginAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
