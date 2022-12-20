import { TestBed } from '@angular/core/testing';

import { SessionRequiredGuard } from './session-required.guard';

describe('SessionRequiredGuard', () => {
  let guard: SessionRequiredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SessionRequiredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
