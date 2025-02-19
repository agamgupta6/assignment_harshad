import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCheckinComponent } from './web-checkin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CheckinService } from '@services/checkin/checkin.service';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { By } from '@angular/platform-browser';

describe('WebCheckinComponent', () => {
  let component: WebCheckinComponent;
  let fixture: ComponentFixture<WebCheckinComponent>;
  let apollo: jasmine.SpyObj<Apollo>;
    let router: jasmine.SpyObj<Router>;
    let checkinService: jasmine.SpyObj<CheckinService>;
  beforeEach(async () => {
    const checkinServiceSpy = jasmine.createSpyObj('CheckinService', ['doCheckin']);
    const apolloSpy = jasmine.createSpyObj('Apollo', ['mutate']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      imports: [WebCheckinComponent,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule
      ],
      
      providers: [
        { provide: CheckinService, useValue: checkinServiceSpy },
        { provide: Apollo, useValue: apolloSpy },
        { provide: Router, useValue: routerSpy },
        provideAnimationsAsync('noop')
      ]
    })
    .compileComponents();
    apollo = TestBed.inject(Apollo) as jasmine.SpyObj<Apollo>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture = TestBed.createComponent(WebCheckinComponent);
    checkinService = TestBed.inject(CheckinService) as jasmine.SpyObj<CheckinService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have familyName required', () => {
    let control = component.checkinForm.get('familyName');
    control?.setValue(null);
    expect(control?.valid).toBeFalsy();
  });

  it('should have bookingcode required', () => {
    let control = component.checkinForm.get('bookingCode');
    control?.setValue(null);
    expect(control?.valid).toBeFalsy();
  });


  it('should call doCheckin on form submit', () => {
    component.checkinForm.setValue({ familyName: 'GUPTA', bookingCode: 'K12345' });
    const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
    formElement.dispatchEvent(new Event('submit'));

    expect(checkinService.doCheckin).toHaveBeenCalledWith('GUPTA', 'K12345');
  });

  it('should not call doCheckin on form  invalid', () => {
    component.checkinForm.setValue({ familyName: '', bookingCode: '' });
    const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
    formElement.dispatchEvent(new Event('submit'));

    expect(checkinService.doCheckin).not.toHaveBeenCalled();
  });

});
