import { TestBed } from '@angular/core/testing';

import { RedirectByRoleGuard } from './redirect-by-role.guard';

describe('RedirectByRoleGuard', () => {
  let guard: RedirectByRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectByRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
