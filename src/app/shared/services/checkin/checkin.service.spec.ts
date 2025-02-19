import { TestBed } from '@angular/core/testing';
import { CheckinService } from './checkin.service';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { of } from 'rxjs';


describe('CheckinService', () => {
  let service: CheckinService;
  let apollo: jasmine.SpyObj<Apollo>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const apolloSpy = jasmine.createSpyObj('Apollo', ['mutate']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        CheckinService,
        { provide: Apollo, useValue: apolloSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
    service = TestBed.inject(CheckinService);
    apollo = TestBed.inject(Apollo) as jasmine.SpyObj<Apollo>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call Apollo', () => {
    const mockResponse = { data: { doCheckin: { message: 'Success' } } };
    apollo.mutate.and.returnValue(of(mockResponse));

    const familyName = 'GUPTA';
    const bookingCode = 'K3456';

    service.doCheckin(familyName, bookingCode);

    expect(apollo.mutate).toHaveBeenCalledWith({
      mutation: jasmine.any(Object),
      variables: { familyName, bookingCode }
    });
  });
});
