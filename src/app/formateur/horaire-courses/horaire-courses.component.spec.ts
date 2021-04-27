import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraireCoursesComponent } from './horaire-courses.component';

describe('HoraireCoursesComponent', () => {
  let component: HoraireCoursesComponent;
  let fixture: ComponentFixture<HoraireCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoraireCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraireCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
