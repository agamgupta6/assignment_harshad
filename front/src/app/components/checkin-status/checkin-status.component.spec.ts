import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinStatusComponent } from './checkin-status.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('CheckinStatusComponent', () => {
  let component: CheckinStatusComponent;
  let fixture: ComponentFixture<CheckinStatusComponent>;
  let router: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'], { lastSuccessfulNavigation: { extras: { state: { message: 'All OK', error: false } } } });    
    
    await TestBed.configureTestingModule({
      imports: [CheckinStatusComponent],
      providers:[
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckinStatusComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to web-checkin on goback', () => {
    component.goBack();
    expect(router.navigateByUrl).toHaveBeenCalledWith('web-checkin');
  });

  it('should display message', () => {
    fixture.detectChanges();
    const messageElement = fixture.debugElement.query(By.css('.success-message')).nativeElement;
    expect(messageElement.textContent).toContain('All OK');
  });

  it('should display error message', () => {
    
    component.isError = true;
    component.message = 'Error occurred';
    
    fixture.detectChanges();

    const messageElement = fixture.debugElement.query(By.css('.error-message')).nativeElement;
    expect(messageElement.textContent).toContain('Error occurred');
  });
});
