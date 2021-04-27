import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeFormateurComponent } from './programme-formateur.component';

describe('ProgrammeFormateurComponent', () => {
  let component: ProgrammeFormateurComponent;
  let fixture: ComponentFixture<ProgrammeFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammeFormateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammeFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
