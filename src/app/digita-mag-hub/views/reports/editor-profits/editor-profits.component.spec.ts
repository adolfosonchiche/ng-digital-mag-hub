import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorProfitsComponent } from './editor-profits.component';

describe('EditorProfitsComponent', () => {
  let component: EditorProfitsComponent;
  let fixture: ComponentFixture<EditorProfitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorProfitsComponent]
    });
    fixture = TestBed.createComponent(EditorProfitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
