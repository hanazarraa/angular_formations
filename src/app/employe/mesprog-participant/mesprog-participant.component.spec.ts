import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesprogParticipantComponent } from './mesprog-participant.component';

describe('MesprogParticipantComponent', () => {
  let component: MesprogParticipantComponent;
  let fixture: ComponentFixture<MesprogParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesprogParticipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesprogParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
