import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterFormationFormateurComponent } from './consulter-formation-formateur.component';

describe('ConsulterFormationFormateurComponent', () => {
  let component: ConsulterFormationFormateurComponent;
  let fixture: ComponentFixture<ConsulterFormationFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterFormationFormateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterFormationFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
