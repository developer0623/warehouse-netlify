import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoilService } from './../../core/services/coil.service';
import { TaskService } from './../../core/services/task.service';
import { DataService } from './../../core/services/data.service';
import { NavService } from './../../core/services/navigation.service';
import { ITaskCoil, ITask } from '../../core/datatypes';

/**
 * Generated class for the DeliverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'app-deliver',
  templateUrl: 'deliver.html',
  styleUrls: ['./deliver.scss']
})
export class DeliverPage {

	public selectedItem: Observable<ITaskCoil>;
	public selectedTask: ITask;
	public selectedTask$: Subscription;
  destination = '';

	constructor(public navCtrl: NavController, private coilService: CoilService,
	 private taskService: TaskService, private navService: NavService, private dataService: DataService) {

		this.selectedItem = this.coilService.dispatchCurrentCoil();
    this.coilService.dispatchCurrentCoil().subscribe(item => {
      console.log('66666', item);
    });

		if(this.selectedTask$ !== undefined) {
			this.selectedTask$.unsubscribe();
		}
		this.selectedTask$ = this.taskService.dispatchCurrentTask().subscribe((task)=>{
			this.selectedTask = task;
			console.log('selectedTask', this.selectedTask);
		});

    combineLatest([this.taskService.dispatchCurrentTask(), this.dataService.dispatchAllLocations()]).subscribe((items) => {
      this.selectedTask = items[0];
      if (!this.selectedTask.destinationLocationId && this.selectedTask.taskType === 'MachineToWarehouse'){
        this.destination = 'Warehouse';
      } else {
        const destinationLoc = items[1].find(item=> item.id === this.selectedTask.destinationLocationId);
        if(destinationLoc) {
          this.destination = destinationLoc.name;
        }
      }

    });


	}

	goback() {
		this.navService.backPage(false);
		// this.navCtrl.popToRoot();
	}

	delivered() {
		this.taskService.dispatchCompletedTask(this.selectedTask);
		this.navService.backPage(false);
		// this.navCtrl.popToRoot();
	}

	gotoCancel() {
		// this.taskService.dispatchCancelTask();
		this.navService.gotoNewPage('cancel-task');
		// this.navCtrl.push('cancel-task');
	}
}
