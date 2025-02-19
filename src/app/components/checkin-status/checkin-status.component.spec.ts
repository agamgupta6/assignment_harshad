import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinStatusComponent } from './checkin-status.component';

describe('CheckinStatusComponent', () => {
  let component: CheckinStatusComponent;
  let fixture: ComponentFixture<CheckinStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckinStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckinStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
