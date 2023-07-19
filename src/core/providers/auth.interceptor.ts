import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        request = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token
            }
        });

        return next.handle(request).pipe(
            tap(
              (event) => {
                if (event instanceof HttpResponse){
                  console.log('Server response');
                }
              },
              (err) => {
                if (err instanceof HttpErrorResponse) {
                  if (err.status === 401) {
                    console.log('Unauthorized');
                  }
                }
              }
            )
          );
    }
}
