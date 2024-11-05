import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {  TodoFeature } from './store/reducer';
import { provideHttpClient } from '@angular/common/http';
import { TodoEffects } from './store/effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideStore(),provideState(TodoFeature), provideEffects(),provideHttpClient()]
};
