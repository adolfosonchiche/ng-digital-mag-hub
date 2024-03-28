import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineViewComponent } from './magazine-view.component';

describe('MagazineViewComponent', () => {
  let component: MagazineViewComponent;
  let fixture: ComponentFixture<MagazineViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagazineViewComponent]
    });
    fixture = TestBed.createComponent(MagazineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
