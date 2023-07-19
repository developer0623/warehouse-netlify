import { Component, OnDestroy } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';

import { TaskService } from './../../core/services/task.service';
import { CoilService } from './../../core/services/coil.service';
import { NavService } from './../../core/services/navigation.service';
import { ITaskCoil, ITask } from '../../core/datatypes';
import { DataService } from '../../core/services/data.service';
/**
 * Generated class for the CoilDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'app-coil-detail',
  templateUrl: 'coil-detail.html',
  styleUrls: ['./coil-detail.scss']
})
export class CoilDetailPage implements OnDestroy {

	public selectedTask: ITask;
	public selectedTask$: Subscription;

	public selectedCoil: ITaskCoil;
	public selectedCoil$: Subscription;

	public locations$: Subscription;

	public errorFlag = 0; // 2 for error icon, 1 for warning icon, 0 for neither
	errorFields: string[] = [];
	warningFields: string[] = [];

	constructor(
		public navCtrl: NavController,
		public actionSheetCtrl: ActionSheetController,
		private taskService: TaskService,
		private coilService: CoilService,
		private navService: NavService,
		private dataService: DataService
	) {
		if(this.selectedTask$ !== undefined) {
			this.selectedTask$.unsubscribe();
		}
		this.selectedTask$ = this.taskService.dispatchCurrentTask().subscribe((task)=> {
			this.selectedTask = _.cloneDeep(task);
		});
		this.getStatusofCoil();
	}

	getStatusofCoil() {
		if(this.selectedCoil$ !== undefined) {
			this.selectedCoil$.unsubscribe();
		}
		this.selectedCoil$ = this.coilService.dispatchCurrentCoil().subscribe((coil)=> {
			this.selectedCoil = _.cloneDeep(coil);
			if (this.selectedTask) {
				if (this.selectedTask.preferredCoils.findIndex((c: any) => c.coilId === this.selectedCoil.id) > -1) {
					// The selected coil is the in preferred coil list. No errors or warnings.
				}
				else if (this.selectedTask.nonpreferredCoils.findIndex((c: any) => c.coilId === this.selectedCoil.id) > -1) {
					// The selected coil is in the nonpreferred list. Show warnings.

					// It just so happens that the only reason we have to put a warning level on a coil
					// is when that coil is 'nonpreferred', and that will happen via the scheduler, and
					// due to our scheduler implementation that will always be because a shorter coil
					// was chosen first. Hence, we hard code it here for now.
					this.warningFields = ['lengthRemainingFt'];
					this.errorFlag = 1;
				}
				else {
					// This coil would be an override.
					this.errorFlag = 2;

					// Compare the values of these fields on the task's Material vs the coil's Material.
					const fields = ['materialType', 'color', 'gauge', 'widthIn'];

					// Any differences are flagged as error fields.
					this.errorFields = fields.filter(field => this.selectedCoil[field] !== this.selectedTask.coilType[field]);

				}
			}
			if(this.selectedCoil && this.selectedCoil.location?.id !== this.selectedCoil.locationId) {
				this.setLocation();
			}
		});
	}

	setLocation() {
		if(this.locations$ !== undefined) {
			this.locations$.unsubscribe();
		}
		this.locations$ =  this.dataService.dispatchAllLocations()
      .subscribe(results => {
        const destinationLoc = results.find(item=>
          item.id === this.selectedCoil.locationId || item.code === this.selectedCoil.locationId
        );
        if(destinationLoc) {
          this.selectedCoil.location = destinationLoc;
          this.coilService.dispatchLocationCoil(destinationLoc.name);
        }
    });
	}

	useThisCoil() {
		if(this.errorFlag === 0) {
			this.taskService.dispatchSelectedCoil(this.selectedCoil, this.selectedTask);
			this.navService.gotoNewPage('deliver');
			// this.navCtrl.push('deliver');

		} else if(this.errorFlag === 1){
			this.navService.gotoNewPage('non-prefered-reason');
			// this.navCtrl.push('non-prefered-reason');
		} else {
			this.navService.gotoNewPage('override-reason');
		}
	}

	async onClickDropdown() {
		const actionSheet = await this.actionSheetCtrl.create({
		 cssClass: 'task-find-action',
	     buttons: [
	       {
	         text: 'Mark Task As Cannot Complete',
	         handler: () => {
	           this.navCtrl.navigateForward('unattainable-reason');
	         }
	       }
	     ]
	   });

	   actionSheet.present();

	}

	goback() {
		this.navService.backPage(true);
		this.navCtrl.pop();
	}

  ngOnDestroy(): void {
    if(this.locations$ !== undefined) {
			this.locations$.unsubscribe();
		}
    if(this.selectedCoil$ !== undefined) {
			this.selectedCoil$.unsubscribe();
		}
  }

}
