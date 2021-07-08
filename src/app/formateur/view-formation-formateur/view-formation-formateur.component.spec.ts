import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormationFormateurComponent } from './view-formation-formateur.component';

describe('ViewFormationFormateurComponent', () => {
  let component: ViewFormationFormateurComponent;
  let fixture: ComponentFixture<ViewFormationFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFormationFormateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFormationFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
