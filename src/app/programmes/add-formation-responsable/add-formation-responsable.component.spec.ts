import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormationResponsableComponent } from './add-formation-responsable.component';

describe('AddFormationResponsableComponent', () => {
  let component: AddFormationResponsableComponent;
  let fixture: ComponentFixture<AddFormationResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFormationResponsableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormationResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
