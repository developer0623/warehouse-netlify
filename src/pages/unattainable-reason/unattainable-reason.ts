import { Component } from '@angular/core';
import {  NavController } from '@ionic/angular';
import {Subscription} from 'rxjs';

import { DataService } from './../../core/services/data.service';
import { TaskService } from './../../core/services/task.service';
import { NavService } from './../../core/services/navigation.service';
/**
 * Generated class for the UnattainableReasonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'app-unattainable-reason',
  templateUrl: 'unattainable-reason.html',
  styleUrls: ['./unattainable-reason.scss']
})
export class UnattainableReasonPage {

	public reasons$: Subscription;
	public selectedTask: any;
	public selectedTask$: Subscription;
	public unReasonList: Array<any>;

	constructor(private taskService: TaskService, public navCtrl: NavController,
	 private dataService: DataService, private navService: NavService) {
		this.getReasons();
		if(this.selectedTask$ !== undefined) {
			this.selectedTask$.unsubscribe();
		}
		this.selectedTask$ = this.taskService.dispatchCurrentTask().subscribe((task)=> {
			this.selectedTask = task;
			// console.log('selectedTask', this.selectedTask);
		});
	}

	getReasons() {
		if(this.reasons$ !== undefined) {
			this.reasons$.unsubscribe();
		}
		this.reasons$ = this.dataService.dispatchGetReasons().subscribe((results)=> {
			this.unReasonList = results.filter((reason)=> reason.codeSet === 'UnattainableReasons');
			// console.log('reasons', this.nonReasonList);
		});
	}

	goback() {
		// this.navCtrl.pop();
		this.navService.backPage(true);
	}

	onClickReason(reason) {
		this.taskService.dispatchUnnattainableTask(this.selectedTask, reason.id);
		// this.navCtrl.popToRoot();
		this.navService.backPage(false);




		// this.selectedTask.overrideCode.reason = reason;
		// this.taskService.dispatchSelectedCoil(this.selectedCoil, this.selectedTask);
		// this.navCtrl.push(DeliverPage, {coil: this.selectedCoil});
	}

}
