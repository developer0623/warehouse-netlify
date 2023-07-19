import { Injectable, inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChildFn,
  Route
} from '@angular/router';
import { NavController} from '@ionic/angular';

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const navCtrl = inject(NavController);

  const url: string = state.url;
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  if(storedToken && storedUser) {
    return true;
  }
  // Navigate to the login page with extras
  navCtrl.navigateRoot('login');
  return false;
  // const authService = inject(AuthenticationService);
  // const router = inject(Router);

  // return authService.checkLogin().pipe(
  //   map(() => true),
  //   catchError(() => {
  //     router.navigate(['route-to-fallback-page']);
  //     return of(false);
  //   })
  // );
};

export const canActivateChild: CanActivateChildFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate, CanActivateChild {
//   constructor(public navCtrl: NavController,) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     const url: string = state.url;

//     return this.checkLogin(url);
//   }

//   canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     return this.canActivate(route, state);
//   }

//   canLoad(route: Route): boolean {
//     const url = `/${route.path}`;

//     return this.checkLogin(url);
//   }

//   checkLogin(url: string): boolean {
//     const storedToken = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');
//     if(storedToken && storedUser) {
//       return true;
//     }
//     // Navigate to the login page with extras
//     this.navCtrl.navigateRoot('login');
//     return false;
//   }
// }
