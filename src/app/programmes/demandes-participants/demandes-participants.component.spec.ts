import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesParticipantsComponent } from './demandes-participants.component';

describe('DemandesParticipantsComponent', () => {
  let component: DemandesParticipantsComponent;
  let fixture: ComponentFixture<DemandesParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandesParticipantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandesParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
