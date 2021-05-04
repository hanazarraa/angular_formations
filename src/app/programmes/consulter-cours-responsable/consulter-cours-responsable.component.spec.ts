import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterCoursResponsableComponent } from './consulter-cours-responsable.component';

describe('ConsulterCoursResponsableComponent', () => {
  let component: ConsulterCoursResponsableComponent;
  let fixture: ComponentFixture<ConsulterCoursResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterCoursResponsableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterCoursResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
