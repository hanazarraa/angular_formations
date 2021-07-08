import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprogComponent } from './myprog.component';

describe('MyprogComponent', () => {
  let component: MyprogComponent;
  let fixture: ComponentFixture<MyprogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyprogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
