import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfitsComponent } from './admin-profits.component';

describe('AdminProfitsComponent', () => {
  let component: AdminProfitsComponent;
  let fixture: ComponentFixture<AdminProfitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProfitsComponent]
    });
    fixture = TestBed.createComponent(AdminProfitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
