import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesProgramEmployeComponent } from './courses-program-employe.component';

describe('CoursesProgramEmployeComponent', () => {
  let component: CoursesProgramEmployeComponent;
  let fixture: ComponentFixture<CoursesProgramEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesProgramEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesProgramEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
