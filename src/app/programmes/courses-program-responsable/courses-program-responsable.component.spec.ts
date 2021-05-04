import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesProgramResponsableComponent } from './courses-program-responsable.component';

describe('CoursesProgramResponsableComponent', () => {
  let component: CoursesProgramResponsableComponent;
  let fixture: ComponentFixture<CoursesProgramResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesProgramResponsableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesProgramResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
