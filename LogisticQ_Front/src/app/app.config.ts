import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';  // Importamos 'routes' correctamente
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//add
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // Agrega provideHttpClient a los proveedores
    provideClientHydration(),
    provideAnimationsAsync(), 
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    importProvidersFrom(BrowserAnimationsModule), provideAnimationsAsync(),
  ]
};
