import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineCrudComponent } from './magazine-crud.component';

describe('MagazinesCrudComponent', () => {
  let component: MagazineCrudComponent;
  let fixture: ComponentFixture<MagazineCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagazineCrudComponent]
    });
    fixture = TestBed.createComponent(MagazineCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
