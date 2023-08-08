import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashcommentComponent } from './dashcomment.component';

describe('DashcommentComponent', () => {
  let component: DashcommentComponent;
  let fixture: ComponentFixture<DashcommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashcommentComponent]
    });
    fixture = TestBed.createComponent(DashcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
