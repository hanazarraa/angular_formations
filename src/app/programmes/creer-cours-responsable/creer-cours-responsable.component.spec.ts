import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerCoursResponsableComponent } from './creer-cours-responsable.component';

describe('CreerCoursResponsableComponent', () => {
  let component: CreerCoursResponsableComponent;
  let fixture: ComponentFixture<CreerCoursResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerCoursResponsableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerCoursResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
