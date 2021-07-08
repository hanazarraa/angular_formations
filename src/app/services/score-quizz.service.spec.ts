import { TestBed } from '@angular/core/testing';

import { ScoreQuizzService } from './score-quizz.service';

describe('ScoreQuizzService', () => {
  let service: ScoreQuizzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreQuizzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
