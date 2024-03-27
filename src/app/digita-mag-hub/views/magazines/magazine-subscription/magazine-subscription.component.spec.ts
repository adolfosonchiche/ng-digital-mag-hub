import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineSubscriptionComponent } from './magazine-subscription.component';

describe('MagazineSubscriptionComponent', () => {
  let component: MagazineSubscriptionComponent;
  let fixture: ComponentFixture<MagazineSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagazineSubscriptionComponent]
    });
    fixture = TestBed.createComponent(MagazineSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
