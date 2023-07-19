import { Component } from '@angular/core';
import {  NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { DataService } from './../../core/services/data.service';
import { TaskService } from './../../core/services/task.service';
import { CoilService } from './../../core/services/coil.service';
import { NavService } from './../../core/services/navigation.service';
import { ITaskCoil } from '../../core/datatypes';


@Component({
  selector: 'app-nonprefered-reason',
  templateUrl: 'nonprefered-reason.html',
  styleUrls: ['./nonprefered-reason.scss']
})
export class NonPreferedReasonPage {

  	public reasons$: Subscription;

	public selectedTask: any;
	public selectedTask$: Subscription;

	public selectedCoil: ITaskCoil;
	public selectedCoil$: Subscription;

	public nonReasonList: Array<any>;

	constructor(private taskService: TaskService, public navCtrl: NavController,
		private dataService: DataService, private coilService: CoilService, private navService: NavService) {
		this.getReasons();
		if(this.selectedTask$ !== undefined) {
			this.selectedTask$.unsubscribe();
		}
		this.selectedTask$ = this.taskService.dispatchCurrentTask().subscribe((task)=> {
			this.selectedTask = task;
		});

		if(this.selectedCoil$ !== undefined) {
			this.selectedCoil$.unsubscribe();
		}
		this.selectedCoil$ = this.coilService.dispatchCurrentCoil().subscribe((coil)=> {
			this.selectedCoil = coil;
		});

	}

	getReasons() {
		if(this.reasons$ !== undefined) {
			this.reasons$.unsubscribe();
		}
		this.reasons$ = this.dataService.dispatchGetReasons()
		.subscribe((results)=> {
			this.nonReasonList = results.filter((reason)=> reason.codeSet === 'NonpreferredReasons');
		});
	}

	goback() {
    console.log('555555');
		// this.navCtrl.pop();
		this.navService.backPage(true);
	}

	onClickReason(reason) {
    console.log('2342323', reason);
    this.selectedTask = {...this.selectedTask, overrideCode: {codeSet:'NonpreferredReasons', reason:reason.id}};
		this.taskService.dispatchSelectedCoil(this.selectedCoil, this.selectedTask);
		this.navService.gotoNewPage('deliver', {coil: this.selectedCoil});
		// this.navCtrl.push('deliver', {coil: this.selectedCoil});
	}

}
