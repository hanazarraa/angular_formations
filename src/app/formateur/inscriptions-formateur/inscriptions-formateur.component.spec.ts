import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionsFormateurComponent } from './inscriptions-formateur.component';

describe('InscriptionsFormateurComponent', () => {
  let component: InscriptionsFormateurComponent;
  let fixture: ComponentFixture<InscriptionsFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionsFormateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionsFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
