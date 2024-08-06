import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(withInterceptors([addInterceptor]))]
};

export function addInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const headers=req.headers.set('x-rapidapi-key',environment.RAPID_API_KEY).set('x-rapidapi-host', environment.RAPID_API_HOST)
  const reqWithHeader = req.clone({
    headers: headers,
  });
  return next(reqWithHeader);
}
