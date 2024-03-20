import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazinesCrudComponent } from './magazines-crud.component';

describe('MagazinesCrudComponent', () => {
  let component: MagazinesCrudComponent;
  let fixture: ComponentFixture<MagazinesCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagazinesCrudComponent]
    });
    fixture = TestBed.createComponent(MagazinesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
