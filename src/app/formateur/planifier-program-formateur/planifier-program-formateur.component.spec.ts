import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanifierProgramFormateurComponent } from './planifier-program-formateur.component';

describe('PlanifierProgramFormateurComponent', () => {
  let component: PlanifierProgramFormateurComponent;
  let fixture: ComponentFixture<PlanifierProgramFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanifierProgramFormateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanifierProgramFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
