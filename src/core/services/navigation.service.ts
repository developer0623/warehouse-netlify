import { Injectable, ViewChild } from '@angular/core';
import { NavController, IonRouterOutlet } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable()
export class NavService {
  @ViewChild(IonRouterOutlet, { static : true }) routerOutlet: IonRouterOutlet;
  constructor(private navCtrl: NavController, private router: Router) {
  }

  gotoNewPage(pageName, params = {}) {
  	localStorage.setItem('params', JSON.stringify(params));
  	// this.navCtrl.navigateForward(pageName, params);
    this.router.navigate([`/${pageName}`], params);

  }
  backPage(state) {
    if(state) {
      this.navCtrl.pop();
      // const backFlag = this.routerOutlet.canGoBack();
      // if(backFlag) {
      //   this.navCtrl.pop();
      // } else {
      //   this.navCtrl.navigateRoot('', {animated: true, animationDirection: 'back'});
      // }
    } else {
      this.navCtrl.navigateRoot('', {animated: true, animationDirection: 'back'});
    }

  }
}
