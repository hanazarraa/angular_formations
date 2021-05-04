import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationsEmployesComponent } from './formations-employes.component';

describe('FormationsEmployesComponent', () => {
  let component: FormationsEmployesComponent;
  let fixture: ComponentFixture<FormationsEmployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationsEmployesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationsEmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
