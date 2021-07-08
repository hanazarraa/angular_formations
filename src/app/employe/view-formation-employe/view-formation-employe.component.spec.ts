import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormationEmployeComponent } from './view-formation-employe.component';

describe('ViewFormationEmployeComponent', () => {
  let component: ViewFormationEmployeComponent;
  let fixture: ComponentFixture<ViewFormationEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFormationEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFormationEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
