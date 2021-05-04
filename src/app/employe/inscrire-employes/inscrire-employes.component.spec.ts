import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscrireEmployesComponent } from './inscrire-employes.component';

describe('InscrireEmployesComponent', () => {
  let component: InscrireEmployesComponent;
  let fixture: ComponentFixture<InscrireEmployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscrireEmployesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscrireEmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
