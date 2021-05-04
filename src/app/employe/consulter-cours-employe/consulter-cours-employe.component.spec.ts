import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterCoursEmployeComponent } from './consulter-cours-employe.component';

describe('ConsulterCoursEmployeComponent', () => {
  let component: ConsulterCoursEmployeComponent;
  let fixture: ComponentFixture<ConsulterCoursEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterCoursEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterCoursEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
