import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsToMyMagazinesComponent } from './subscriptions-to-my-magazines.component';

describe('SubscriptionsToMyMagazinesComponent', () => {
  let component: SubscriptionsToMyMagazinesComponent;
  let fixture: ComponentFixture<SubscriptionsToMyMagazinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionsToMyMagazinesComponent]
    });
    fixture = TestBed.createComponent(SubscriptionsToMyMagazinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
