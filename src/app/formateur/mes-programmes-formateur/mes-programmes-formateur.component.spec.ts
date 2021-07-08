import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesProgrammesFormateurComponent } from './mes-programmes-formateur.component';

describe('MesProgrammesFormateurComponent', () => {
  let component: MesProgrammesFormateurComponent;
  let fixture: ComponentFixture<MesProgrammesFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesProgrammesFormateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesProgrammesFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
