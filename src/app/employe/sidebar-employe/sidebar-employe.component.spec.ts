import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarEmployeComponent } from './sidebar-employe.component';

describe('SidebarEmployeComponent', () => {
  let component: SidebarEmployeComponent;
  let fixture: ComponentFixture<SidebarEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
