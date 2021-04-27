import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesFormateurComponent } from './courses-formateur.component';

describe('CoursesFormateurComponent', () => {
  let component: CoursesFormateurComponent;
  let fixture: ComponentFixture<CoursesFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesFormateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
