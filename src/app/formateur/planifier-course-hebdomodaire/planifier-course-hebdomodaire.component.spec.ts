import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanifierCourseHebdomodaireComponent } from './planifier-course-hebdomodaire.component';

describe('PlanifierCourseHebdomodaireComponent', () => {
  let component: PlanifierCourseHebdomodaireComponent;
  let fixture: ComponentFixture<PlanifierCourseHebdomodaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanifierCourseHebdomodaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanifierCourseHebdomodaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
