import { TestBed } from '@angular/core/testing';

import { UserGettingService } from './user-getting.service';

describe('UserGettingService', () => {
  let service: UserGettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
