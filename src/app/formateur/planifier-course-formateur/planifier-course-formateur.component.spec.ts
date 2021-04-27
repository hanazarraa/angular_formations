import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanifierCourseFormateurComponent } from './planifier-course-formateur.component';

describe('PlanifierCourseFormateurComponent', () => {
  let component: PlanifierCourseFormateurComponent;
  let fixture: ComponentFixture<PlanifierCourseFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanifierCourseFormateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanifierCourseFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
