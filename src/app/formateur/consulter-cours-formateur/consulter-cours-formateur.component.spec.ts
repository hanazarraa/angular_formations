import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterCoursFormateurComponent } from './consulter-cours-formateur.component';

describe('ConsulterCoursFormateurComponent', () => {
  let component: ConsulterCoursFormateurComponent;
  let fixture: ComponentFixture<ConsulterCoursFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterCoursFormateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterCoursFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
