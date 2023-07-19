import { Component, OnInit } from '@angular/core';
import { NavController, Config, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { IUser } from '../../core/datatypes';
import { AuthService } from './../../core/providers/auth.service';
import { UrlService } from './../../core/providers/url';
import { AlertController, LoadingController } from '@ionic/angular';
import { LoadingService } from './../../core/services/loading.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalFooService } from 'src/core/services/globalFoo.service';
import * as AuthActions from './../../core/store/auth/auth.actions';
import { environment } from '../../environments/environment';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'app-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss']
})
export class LoginPage implements OnInit {

	public user: IUser = {username:'', password:'', url:''};
	public saveFlag = true;
	public getApiRootFromUser = true;
	public pwaFlag = false;
	constructor(
		public navCtrl: NavController,
		private loadingService: LoadingService,
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController,
		private auth: AuthService,
		private urlService: UrlService,
		private globalFooService: GlobalFooService,
    private store: Store<any>
	) {
    console.log('111111', window.location.hostname.split('.'));
    const isLocalhost = window.location.hostname.split('.')[0] === 'localhost';

			if(environment.mode === 'PWA' && !isLocalhost) {
				this.user.url = window.location.origin;
				this.pwaFlag = true;
			} else if(environment.mode === 'PWA' && isLocalhost) {
        this.user.url = 'http://pro-alpha.amscontrols.com:8080';
				this.pwaFlag = true;
      }
	}

	ngOnInit() {
		const userState = localStorage.getItem('user');
		if (userState) {
			this.user = JSON.parse(userState);
		}
		localStorage.setItem('token', '');

		if(this.loadingService.loadingFlag) {
      this.loadingService.removeLoading();
    }
	}

	async onLogin() {
		if (this.validateUser(this.user)) {
			const loading = await this.loadingCtrl.create();
			loading.present();
			this.urlService.setMainUrl(this.user.url);

			this.auth.login(this.user)
      .subscribe({
        next: (result) => {
          loading.dismiss();
          this.globalFooService.publishSomeData({
            status: 'user:loggedin',
            userName: result.userName
          });
          this.store.dispatch(AuthActions.loginAction(this.user));
          this.navCtrl.navigateRoot('', { animated: true, animationDirection: 'forward' });

          this.user.password = undefined;
          if (this.saveFlag) {
            localStorage.setItem('user', JSON.stringify(this.user));
          }
        },
        error: async (err) => {
          loading.dismiss();

          if(err instanceof HttpErrorResponse && err.status === 401) {
            const alert = await this.alertCtrl.create({
              header: 'Failed',
              subHeader: 'username or password is incorrect',
              buttons: ['Ok']
            });
            alert.present();
          } else {
            const alert = await this.alertCtrl.create({
              header: 'Server unreachable',
              subHeader: err.message + '/' + err.statusText,
              buttons: ['Ok']
            });
            alert.present();
          }
        },

      });
		} else {
			const alert = await this.alertCtrl.create({
				header: 'Wrong Input',
				subHeader: 'Please validate',
				buttons: ['Ok']
			});
			alert.present();
		}
	}

	private validateUser(user: IUser) {
		if ((user.password || '').length === 0) {
			return false;
		}
		if ((user.username || '').length === 0) {
			return false;
		}

		if (environment.mode === 'PWA') {
			return true;
		} else if ((user.url || '').length === 0) {
			return false;
		} else {
			return true;
		}
	}
}
