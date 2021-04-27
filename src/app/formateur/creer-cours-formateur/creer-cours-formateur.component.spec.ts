import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerCoursFormateurComponent } from './creer-cours-formateur.component';

describe('CreerCoursFormateurComponent', () => {
  let component: CreerCoursFormateurComponent;
  let fixture: ComponentFixture<CreerCoursFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerCoursFormateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerCoursFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
