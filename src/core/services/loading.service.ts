import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {
  public loading;
  public loadingFlag = false;

  constructor(private loadingCtrl: LoadingController) {
  }

  async showLoading() {
    this.loadingFlag = true;
    this.loading = await this.loadingCtrl.create();
    this.loading.present();
  }

  removeLoading() {
    this.loadingFlag = false;
    if(this.loading) {
      this.loading.dismiss();
    }
  }
}
