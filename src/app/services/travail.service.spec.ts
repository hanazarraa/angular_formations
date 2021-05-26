import { TestBed } from '@angular/core/testing';

import { TravailService } from './travail.service';

describe('TravailService', () => {
  let service: TravailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
