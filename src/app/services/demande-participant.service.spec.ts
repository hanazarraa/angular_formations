import { TestBed } from '@angular/core/testing';

import { DemandeParticipantService } from './demande-participant.service';

describe('DemandeParticipantService', () => {
  let service: DemandeParticipantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeParticipantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
