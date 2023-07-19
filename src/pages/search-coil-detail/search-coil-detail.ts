import { Component } from '@angular/core';
import {  NavController } from '@ionic/angular';
import {Subscription} from 'rxjs';

import { CoilService } from './../../core/services/coil.service';
import { NavService } from './../../core/services/navigation.service';
import { ITaskCoil } from '../../core/datatypes';
/**
 * Generated class for the SearchCoilDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'app-search-coil-detail',
  templateUrl: 'search-coil-detail.html',
  styleUrls: ['./search-coil-detail.scss']
})
export class SearchCoilDetailPage {

	public selectedCoil: ITaskCoil;
	public selectedCoil$: Subscription;
	public preferFlag = true;

	public dropdownFlag = true;
	public dropDownActions: Array<any> = [];

	constructor(public navCtrl: NavController,
		private coilService: CoilService, private navService: NavService) {

		if(this.selectedCoil$ !== undefined) {
			this.selectedCoil$.unsubscribe();
		}
		this.selectedCoil$ = this.coilService.dispatchCurrentCoil().subscribe(
			coil=> {
				this.selectedCoil = coil;
			});

		this.dropDownActions = [{id: 0, title: 'Edit Coil'}, {id: 1, title: 'Action 2'}, {id: 2, title: 'Action 3'}];
	}

	// gotoDeliver() {
	// 	if(this.preferFlag) {
	// 		this.navCtrl.push(DeliverPage);
	// 	} else {
	// 		this.navCtrl.push(NonPreferedReasonPage);
	// 	}
	// }

	onClickDropdown() {
		this.dropdownFlag = !this.dropdownFlag;
	}

	onAction(action) {
		this.dropdownFlag = !this.dropdownFlag;
	}

	goback() {
    this.navCtrl.pop();
		this.navService.backPage(true);
	}

}
