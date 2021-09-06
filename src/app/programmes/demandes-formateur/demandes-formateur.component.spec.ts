import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesFormateurComponent } from './demandes-formateur.component';

describe('DemandesFormateurComponent', () => {
  let component: DemandesFormateurComponent;
  let fixture: ComponentFixture<DemandesFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandesFormateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandesFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
