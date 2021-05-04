import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesProgramFormateurComponent } from './courses-program-formateur.component';

describe('CoursesProgramFormateurComponent', () => {
  let component: CoursesProgramFormateurComponent;
  let fixture: ComponentFixture<CoursesProgramFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesProgramFormateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesProgramFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
