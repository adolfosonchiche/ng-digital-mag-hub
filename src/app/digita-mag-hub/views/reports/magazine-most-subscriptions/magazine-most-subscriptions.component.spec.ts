import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineMostSubscriptionsComponent } from './magazine-most-subscriptions.component';

describe('MagazineMostSubscriptionsComponent', () => {
  let component: MagazineMostSubscriptionsComponent;
  let fixture: ComponentFixture<MagazineMostSubscriptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagazineMostSubscriptionsComponent]
    });
    fixture = TestBed.createComponent(MagazineMostSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
