import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { AutenthicationService } from './autenthication.service';

describe('AutenthicationService', () => {
  let service: AutenthicationService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenthicationService);
  });

  httpClient = TestBed.get(HttpClient);


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
