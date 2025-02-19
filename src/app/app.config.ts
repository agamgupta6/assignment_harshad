import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { httpInterceptor } from '@interceptors/http/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()), provideAnimationsAsync('noop'), 
    provideHttpClient(
      withInterceptors([httpInterceptor])
    ), provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({
          uri: 'http://localhost:4000/newapp/checkin',
        }),
        cache: new InMemoryCache(),
      };
    })]
};
