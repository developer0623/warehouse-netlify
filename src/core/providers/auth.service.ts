import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface UserLoginResponse {
  userName: string;
  claims: string[];
  roles: string[];
  serverId: string;
  token: string;
}

@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;
  private _accessToken: string;

  constructor(private http: HttpClient, private store: Store<any>) {}
  public get accessToken(): string {
    return this._accessToken;
  }

  public set accessToken(v: string) {
    this._accessToken = v;
  }

  login(creds: {
    username: string;
    password: string;
    url: string;
  }): Observable<UserLoginResponse> {
    creds = Object.assign({ application: 'Warehouse' }, creds);
    return this.http
      .post<UserLoginResponse>(creds.url + '/api/auth/login', creds)
      .pipe(
        tap((response) => {
          this.accessToken = response.token;
          localStorage.setItem('token', response.token);
          // this.store.dispatch(TaskActions.viewTaskAction(task));
          console.log('access', response);
        })
      );
  }

  logout() {
    // localStorage.setItem('rememberMe', 'false');
    // return Promise.all([this.databaseService.remove('auth'), this.databaseService.remove('user')]).then(() => {
    //     this.accessToken = null;
    // });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a message */
  private log(message: string) {
    console.log('message', message);
  }
}

