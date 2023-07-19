
import { NgModule } from '@angular/core';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { CoreStoreModule } from './store';
import { AppEffectsModules } from './effects';

import { APP_SERVICES } from './services';
import { APP_PROVIDERS } from './providers';
import { AuthInterceptor } from './providers/auth.interceptor';

@NgModule({
  imports: [
    HttpClientModule,
    CoreStoreModule,
    ...AppEffectsModules,
  ],
  declarations: [
  ],
  exports: [
    CoreStoreModule,
  ],
  providers: [
    ...APP_SERVICES,
    ...APP_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  },
  ]
})
export class CoreModule {}
