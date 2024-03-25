import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineSearchComponent } from './magazine-search.component';

describe('MagazineSearchComponent', () => {
  let component: MagazineSearchComponent;
  let fixture: ComponentFixture<MagazineSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagazineSearchComponent]
    });
    fixture = TestBed.createComponent(MagazineSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
