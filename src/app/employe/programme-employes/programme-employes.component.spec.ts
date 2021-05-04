import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeEmployesComponent } from './programme-employes.component';

describe('ProgrammeEmployesComponent', () => {
  let component: ProgrammeEmployesComponent;
  let fixture: ComponentFixture<ProgrammeEmployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammeEmployesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammeEmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
