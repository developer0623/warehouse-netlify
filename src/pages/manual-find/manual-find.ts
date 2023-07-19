import { Component } from '@angular/core';
import {  NavController, AlertController } from '@ionic/angular';
import {Subscription} from 'rxjs';

import { TaskService } from './../../core/services/task.service';
import { CoilService } from './../../core/services/coil.service';
import { DataService } from './../../core/services/data.service';
import { NavService } from './../../core/services/navigation.service';
import { ITask } from '../../core/datatypes';

// import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-manual-find',
  templateUrl: 'manual-find.html',
  styleUrls: ['./manual-find.scss']
})
export class ManualFindPage {

	public seletedTask: ITask;
	public seletedTask$: Subscription;

	public coilId: any;
	public allCoils: Array<any> = [];
	public allCoils$: Subscription;

	public selectedCoil: any;

	constructor(public navCtrl: NavController, private taskService: TaskService, private coilService: CoilService,
		private dataService: DataService, private alertCtrl: AlertController, private navService: NavService) {

		if(this.seletedTask$ !== undefined) {
			this.seletedTask$.unsubscribe();
		}
		this.seletedTask$ = this.taskService.dispatchCurrentTask().subscribe(task=> {
			this.seletedTask = task;
		});
		this.getAllCoils();
	}

	// gotoDetail(coil, preferFlag) {
	// 	this.navCtrl.push(CoilDetailPage, {task: this.seletedTask, coil: coil, preferFlag: preferFlag});
	// }

	getAllCoils() {
		if(this.allCoils$ !== undefined) {
			this.allCoils$.unsubscribe();
		}
	  	this.allCoils$ = this.dataService.dispatchAllCoils()
	  	.subscribe(coils => {
	  		this.allCoils = coils;
	  	});
  	}

	goback() {
		this.navCtrl.pop();
		this.navService.backPage(true);
	}

	searchCoil() {
		this.selectedCoil = this.allCoils.filter((coil) => this.coilId.toLowerCase() === coil.id.toLowerCase());

		const length1 = this.selectedCoil.length;

		if(length1 === 1) {
			this.coilService.dispatchViewCoil(this.selectedCoil[0]);
			this.navService.gotoNewPage('coil-detail', {preferFlag: true});
			// this.navCtrl.push('coil-detail', {preferFlag: true});
		} else if(length1 === 0) {
			this.presentAlert('No coils found');
		} else {
			this.presentAlert('Multiple coils found, please check the coil id');
		}

	}

	async presentAlert(content ) {
	  const alert = await this.alertCtrl.create({
	    header: 'Display Error',
	    subHeader: content,
	    buttons: ['Ok']
	  });
	  alert.present();
	}

	// onClickAllCoils() {
	// 	this.nonPreferFlag = !this.nonPreferFlag;
	// }

}
