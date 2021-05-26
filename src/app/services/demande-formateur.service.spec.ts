import { TestBed } from '@angular/core/testing';

import { DemandeFormateurService } from './demande-formateur.service';

describe('DemandeFormateurService', () => {
  let service: DemandeFormateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeFormateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
