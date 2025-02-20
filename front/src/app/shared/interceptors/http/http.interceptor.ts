import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';

export function httpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn):
 Observable<HttpEvent<unknown>> {
  const route = inject(Router);
  return next(req).pipe(
  catchError((httpError: HttpErrorResponse) => {
   switch( httpError.status){
    case 401:
      route.navigate(['checkin-status'], { state: { message:'You are not authorized to perform this action',error:true } });
      break;
    case 500:
      route.navigate(['checkin-status'], { state: { message:'There is some problem. Please try again.',error:true } });
      break;
    case 400:
      route.navigate(['checkin-status'], { state: { message:httpError.error?.errors[0].message,error:true } });
      break;
      default:
        route.navigate(['checkin-status'], { state: { message:'There is some problem. Please try again.',error:true } });
   }
    return throwError(() => httpError);
  }));
}
