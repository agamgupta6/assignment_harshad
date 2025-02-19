import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';

export function httpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn):
 Observable<HttpEvent<unknown>> {
  const route = inject(Router);
  return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      console.log(req.url, 'returned a response with status', event.status);
    }
  }),
  catchError((httpError: HttpErrorResponse) => {
    console.log('error in api ',httpError.error?.errors[0].message);
    route.navigate(['checkin-status'], { state: { message:httpError.error?.errors[0].message } });
    return throwError(() => httpError);
  }));
}
