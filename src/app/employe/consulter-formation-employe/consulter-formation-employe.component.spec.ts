import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterFormationEmployeComponent } from './consulter-formation-employe.component';

describe('ConsulterFormationEmployeComponent', () => {
  let component: ConsulterFormationEmployeComponent;
  let fixture: ComponentFixture<ConsulterFormationEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterFormationEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterFormationEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
