import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterFormationResponsableComponent } from './consulter-formation-responsable.component';

describe('ConsulterFormationResponsableComponent', () => {
  let component: ConsulterFormationResponsableComponent;
  let fixture: ComponentFixture<ConsulterFormationResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterFormationResponsableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterFormationResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
