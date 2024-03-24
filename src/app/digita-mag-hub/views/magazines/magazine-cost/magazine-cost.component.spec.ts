import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineCostComponent } from './magazine-cost.component';

describe('MagazineCostComponent', () => {
  let component: MagazineCostComponent;
  let fixture: ComponentFixture<MagazineCostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagazineCostComponent]
    });
    fixture = TestBed.createComponent(MagazineCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
