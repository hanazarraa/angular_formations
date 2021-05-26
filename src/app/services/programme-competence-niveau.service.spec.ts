import { TestBed } from '@angular/core/testing';

import { ProgrammeCompetenceNiveauService } from './programme-competence-niveau.service';

describe('ProgrammeCompetenceNiveauService', () => {
  let service: ProgrammeCompetenceNiveauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgrammeCompetenceNiveauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
