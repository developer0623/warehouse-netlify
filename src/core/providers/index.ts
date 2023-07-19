/** Khai các http service provider */
import { DataProvider } from './provider';
import { AuthService } from './auth.service';
import { UrlService } from './url';

export const APP_PROVIDERS = [
  DataProvider,
  AuthService,
  UrlService
];
