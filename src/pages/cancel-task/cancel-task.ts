import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import {Subscription} from 'rxjs';

import { DataService } from './../../core/services/data.service';

import { TaskService } from './../../core/services/task.service';
import { CoilService } from './../../core/services/coil.service';
import { ITaskCoil, ITask, ILocation } from '../../core/datatypes';

import { NavService } from './../../core/services/navigation.service';
/**
 * Generated class for the CancelTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'app-cancel-task',
  templateUrl: 'cancel-task.html',
  styleUrls: ['./cancel-task.scss']
})
export class CancelTaskPage {

	public locations: Array<ILocation>;
	public locations$: Subscription;

	public selectedTask: ITask;
	public selectedTask$: Subscription;

	public selectedCoil: ITaskCoil;
	public selectedCoil$: Subscription;

	constructor(public navCtrl: NavController, private dataService: DataService, private taskService: TaskService
		, private coilService: CoilService, private navService: NavService) {
		this.getLocations();
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

	getLocations() {
		if(this.locations$ !== undefined) {
			this.locations$.unsubscribe();
		}
		this.locations$ = this.dataService.dispatchAllLocations().subscribe((locations)=> {
			// console.log('locations', locations);
			this.locations = locations.filter((location)=> location.category==='Warehouse');
		});
		// this.service.gettaks()
  //   	.subscribe(response => {
  //          this.locations = response.warehouseLocations;

  //     	}, err => {
  //        console.log(err);
  //     	});
	}

	goback() {
		this.navService.backPage(true);
		// this.navCtrl.pop();
	}

	onClickLocation(location) {
		this.taskService.dispatchCancelTask(this.selectedTask.id, this.selectedCoil.id, location.id);
		this.navService.backPage(false);
		// this.navCtrl.popToRoot();
	}

}
