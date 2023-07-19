import { Component, OnInit } from '@angular/core';
import {  NavController, ActionSheetController } from '@ionic/angular';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';

import { TaskService } from './../../core/services/task.service';
import { DataService } from './../../core/services/data.service';
import { CoilService } from './../../core/services/coil.service';
import { NavService } from './../../core/services/navigation.service';

import { ITask, ITaskCoil } from '../../core/datatypes';

import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { environment } from '../../environments/environment';

/**
 * Generated class for the TaskDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'app-task-detail',
  templateUrl: 'task-detail.html',
  styleUrls: ['./task-detail.scss']
})
export class TaskDetailPage implements OnInit {

  public seletedTask: ITask;
  public seletedTask$: Subscription;

	public nonPreferFlag = false;
	public allCoils: Array<ITaskCoil> = [];
	public allCoils$: Subscription;

	public coilIds: Array<any> = [];
	public preferedCoils: Array<ITaskCoil> = [];
	public nonPreferedCoils: Array<ITaskCoil> = [];
	isPwa = false;

	constructor(public navCtrl: NavController, private dataService: DataService,
		public actionSheetCtrl: ActionSheetController, private taskService: TaskService, private navService: NavService,
		private coilService: CoilService, private barcodeScanner: BarcodeScanner) {
			if(environment.mode === 'PWA') {
				this.isPwa = true;
			}
	}

	ngOnInit() {
		this.getAllCoils();
	}

	getTask() {
		if(this.seletedTask$ !== undefined) {
			this.seletedTask$.unsubscribe();
		}
		this.seletedTask$ = this.taskService.dispatchCurrentTask().subscribe((task)=>{
			this.seletedTask = _.cloneDeep(task);
			this.preferedCoils = this.getFilterCoils(this.seletedTask.preferredCoils);
			this.nonPreferedCoils = this.getFilterCoils(this.seletedTask.nonpreferredCoils);
		});
	}

	getFilterCoils(array){
		const newCoils = [];
		array.map((coil: any)=> {
			const index = this.coilIds.indexOf(coil.coilId);
			if (index> -1) {
				const newCoil = _.assign({}, coil, this.allCoils[index]);
				newCoils.push(newCoil);
			}
		});
		return newCoils;
	}

	getAllCoils() {
	   if(this.allCoils$ !== undefined) {
	   	this.allCoils$.unsubscribe();
	   }
	   this.allCoils$ = this.dataService.dispatchTaskCoils()
	   .subscribe((coils) => {
	   		this.allCoils = _.cloneDeep(coils);
	   		this.coilIds = _.map(coils, 'id');
	   		this.getTask();
       });

  	}

	gotoDetail(coil) {
		this.coilService.dispatchViewCoil(coil);
		this.navService.gotoNewPage('coil-detail');
		// this.navCtrl.push('coil-detail', {preferFlag: preferFlag});
	}

	goback() {
		this.taskService.dispatchReadyTask(this.seletedTask);
		this.navCtrl.pop();
		// this.navService.backPage(true);
	}

	onClickAllCoils() {
		if(this.nonPreferedCoils.length > 0) {
      this.nonPreferFlag = !this.nonPreferFlag;
    }
	}

	gotoManual() {
		this.navService.gotoNewPage('manual-find');
		// this.navCtrl.push('manual-find');
	}

	onFilter() {
		this.navService.gotoNewPage('all-coil',
			{preferedCoils: this.preferedCoils, nonPreferedCoils: this.nonPreferedCoils, taskFlag: true}
		);
	    // this.navCtrl.push('all-coil', {coils: allCoils, taskFlag: true});
	}

	gotoScan() {
		this.barcodeScanner.scan().then((barcodeData) => {
         this.searchCoil(barcodeData.text);
      }, (err) => {
          alert(JSON.stringify(err));
      });

	}

	searchCoil(coilid) {

      let coil = this.preferedCoils.find((item: any)=> item.id === coilid);
      if(coil) {
      	this.coilService.dispatchViewCoil(coil);
      	this.navService.gotoNewPage('coil-detail');
        // this.navCtrl.push('coil-detail', {preferFlag: true});
      } else {
        coil = this.nonPreferedCoils.find((item: any)=> item.id === coilid);
      	if(coil) {
      		this.coilService.dispatchViewCoil(coil);
      		this.navService.gotoNewPage('coil-detail');
      		// this.navCtrl.push('coil-detail', {preferFlag: false});
      	} else {
      		alert('There is no coil');
      	}
      }
    }

	async onClickDropdown() {
		const actionSheet = await this.actionSheetCtrl.create({
		 cssClass: 'task-find-action',
	     buttons: [
	       {
	         text: 'Mark Task As Cannot Complete',
	         handler: () => {
	          //  this.taskService.dispatchUnnattainableTask(this.seletedTask);
	           this.navCtrl.navigateForward('unattainable-reason');

	         }
	       },
         {
          text: 'All Coils',
          handler: () => {
            this.navService.gotoNewPage('all-coil',
              {preferedCoils: this.preferedCoils, nonPreferedCoils: this.nonPreferedCoils, taskFlag: true}
            );

          }
        }
	     ]
	   });

	   actionSheet.present();

	}

}
