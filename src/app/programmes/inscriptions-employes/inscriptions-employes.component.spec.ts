import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionsEmployesComponent } from './inscriptions-employes.component';

describe('InscriptionsEmployesComponent', () => {
  let component: InscriptionsEmployesComponent;
  let fixture: ComponentFixture<InscriptionsEmployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionsEmployesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionsEmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
