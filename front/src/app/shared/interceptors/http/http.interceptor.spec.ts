import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { httpInterceptor } from './http.interceptor';
import { Router } from '@angular/router';

describe('httpInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let router: jasmine.SpyObj<Router>;

  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => httpInterceptor(req, next));

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        provideHttpClient(withInterceptors([httpInterceptor])),
        provideHttpClientTesting(),
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });


  it('should navigate to checkin-status - 401 - error', () => {
    const url = '/newapp/checkin'
    httpClient.get(url).subscribe({
      next: () => fail('401'),
      error: () => {}
    });

    const req = httpTestingController.expectOne(url);
    req.flush('', { status: 401, statusText: 'Unauthorized' });

    expect(router.navigate).toHaveBeenCalledWith(['checkin-status'], { state: { message: 'You are not authorized to perform this action', error: true } });
  });

  it('should navigate to checkin-status - 500 - error', () => {
    const url = '/newapp/checkin'
    httpClient.get(url).subscribe({
      next: () => fail('500'),
      error: () => {}
    });

    const req = httpTestingController.expectOne(url);
    req.flush('', { status: 500, statusText: 'Unauthorized' });

    expect(router.navigate).toHaveBeenCalledWith(['checkin-status'], { state: { message:'There is some problem. Please try again.',error:true } });
  });

  it('should navigate to checkin-status - 400 - error', () => {
    const url = '/newapp/checkin'
    const mockError = { errors: [{ message: 'Checkin not allowed' }] };
    httpClient.get(url).subscribe({
      next: () => fail('400'),
      error: () => {}
    });

    const req = httpTestingController.expectOne(url);
    req.flush(mockError, { status: 400, statusText: 'Unauthorized' });

    expect(router.navigate).toHaveBeenCalledWith(['checkin-status'], { state: { message: mockError.errors[0].message, error: true } });
  });

});
