import { TestBed } from '@angular/core/testing';

import { RolebasedAuthenticateGuard } from './rolebased-authenticate.guard';

describe('RolebasedAuthenticateGuard', () => {
  let guard: RolebasedAuthenticateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolebasedAuthenticateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
