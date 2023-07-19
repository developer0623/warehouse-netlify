import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import {Subscription} from 'rxjs';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { DataService } from './../../core/services/data.service';
import { TaskService } from './../../core/services/task.service';
import { CoilService } from './../../core/services/coil.service';
import { NavService } from './../../core/services/navigation.service';

import { ITask, ITaskCoil } from '../../core/datatypes';
import { FilterModalPage } from '../filter-modal/filter-modal';

/**
 * Generated class for the AllCoilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'app-all-coil',
  templateUrl: 'all-coil.html',
  styleUrls: ['./all-coil.scss']
})
export class AllCoilsPage implements OnInit {

	public allCoils: Array<ITaskCoil>;
	public allCoils$: Subscription;
	public searchedCoils: Array<ITaskCoil> = [];
	public showedCoils: Array<ITaskCoil>;

	public firstCount = 0;
	public secondCount = 20;
	public lastCount: number;

	public filterCount = 0;

	public taskFlag = false;
	public seletedTask: ITask;
	public seletedTask$: Subscription;

	public selectedFilters: Array<any> = [];

	public dateArray = [31536000000, 26265600000, 20995200000, 15724800000, 10454400000, 5270400000, 1209600000, 0];
	public sortIndex = 0;

	private preferedCoils: any[];
	private nonPreferedCoils: any[];

	constructor(
		public navCtrl: NavController,
		private dataService: DataService,
		private taskService: TaskService,
		private coilService: CoilService,
		private modalCtrl: ModalController,
		private navService: NavService,
    private route: ActivatedRoute
	) {	}

	ngOnInit() {
		const localParams = JSON.parse(localStorage.getItem('params'));
    this.route.queryParams.subscribe(params => {
      this.preferedCoils = params.preferedCoils || [];
      this.nonPreferedCoils= params.nonPreferedCoils || [];
      this.taskFlag = params.taskFlag || localParams.taskFlag;
      if(this.taskFlag) {
        if (this.seletedTask$ !== undefined) {
                this.seletedTask$.unsubscribe();
            }
        this.seletedTask$ = this.taskService.dispatchCurrentTask().subscribe((task)=>{
          this.seletedTask = task;
        });
      }
    });
		this.getAllCoils();
  	}

	getAllCoils() {
		const computeErrorLevel = (coil) => {
			if (this.preferedCoils.length === 0 && this.nonPreferedCoils.length === 0) {
				return 0;
			}

			const preferred = this.preferedCoils.findIndex(pc => pc.id === coil.id) > -1;
			const nonpref = this.nonPreferedCoils.findIndex(pc => pc.id === coil.id) > -1;
			return preferred ? 0 : (nonpref ? 1 : 2);
		};

		if (this.allCoils$ !== undefined) {
            this.allCoils$.unsubscribe();
      	}


	   this.allCoils$ = this.dataService.dispatchTaskCoils()
	   .subscribe((data) => {
		  const dataWErrorlevel = data.map(coil => (
			 { ...coil, errorFlag: computeErrorLevel(coil) }
		  ));
	   	  this.allCoils = dataWErrorlevel;
          this.searchedCoils = dataWErrorlevel;
          this.makeShowedCoils();
       });
  	}

  	makeShowedCoils() {
  		this.firstCount = 0;
		this.lastCount = this.searchedCoils.length;
		if(this.secondCount< this.lastCount) {
			this.secondCount = 20;
		} else {
			this.secondCount = this.lastCount;
		}
		this.showedCoils = this.searchedCoils.slice(this.firstCount, this.secondCount);
	}


	doInfinite(ev) {
		this.firstCount = this.secondCount+1;
	    this.secondCount += 20;
	    if(this.secondCount > this.lastCount){
	       this.secondCount = this.lastCount;
	    }

	    const newCoils = this.searchedCoils.slice(this.firstCount, this.secondCount);
	    this.showedCoils = this.showedCoils.concat(newCoils);
	    setTimeout(() => {
        (ev as InfiniteScrollCustomEvent).target.complete();
      }, 500);
	}

	gotoDetail(coil) {
		this.coilService.dispatchViewCoil(coil);
		if(this.taskFlag){
			this.navService.gotoNewPage('coil-detail');
			// this.navCtrl.push('coil-detail');
		} else {
			this.navService.gotoNewPage('search-coil-detail');
			// this.navCtrl.push('search-coil-detail');
		}

	}

	goback() {
		this.navCtrl.pop();
		this.navService.backPage(true);
	}

	onInput(event) {
    const query = event.target.value.toLowerCase();
		this.searchedCoils = this.allCoils.filter((item: ITaskCoil)=> {
	        const isSearched = item.id.toLowerCase().indexOf(query) >= 0 ||
				item.coilTypeCode.toLowerCase().indexOf(query) >= 0;
			return isSearched;
		});

	    this.lastCount = this.searchedCoils.length;
		if(this.secondCount< this.lastCount) {
			this.secondCount = 20;
		} else {
			this.secondCount = this.lastCount;
		}
		this.showedCoils = this.searchedCoils.slice(0, this.secondCount);
	}

	async gotoFilter() {
		const filterModal = await this.modalCtrl.create({
			component: FilterModalPage,
			componentProps: {
				taskFlag: this.taskFlag,
				sortIndex: this.sortIndex,
				selectedFilters: this.selectedFilters
			}
		});
		filterModal.onDidDismiss().then((result)=>{
			// if(this.filterCount !== result.count) {
			if (result !== null) {
				this.filterCount = result.data.count;
				this.sortIndex = result.data.sortIndex;
				this.selectedFilters = result.data.selectedFilters;
				this.implementFilter();
			}
			// }

		});
   		filterModal.present();

	}

	jsLcfirst(str)
	{
		if(str === 'LengthRemainingFt_Range') {
			return 'lengthRemainingFt';
		}
	    return str.charAt(0).toLowerCase() + str.slice(1);
	}


	convertDates(str) {
    	const newDates = str.split('TO');
    	return {firstDate: this.removeSpecialChar(newDates[0]), secondDate: this.removeSpecialChar(newDates[1])};
    }

    removeSpecialChar(str) {
    	const newStr = str.replace(/[\/\\ {}]/g, '').replace('[','').replace(']','');
    	return newStr;
    }

    convertLength(str) {
    	const newL = str.split('TO');
    	return {firstL: this.removeSpecialChar1(newL[0]), secondL: this.removeSpecialChar1(newL[1])};
    }

    removeSpecialChar1(str) {
    	const newStr = str.replace(/[\/\\ {}]/g, '').replace('[','').replace(']','').replace('Dx','');
    	return newStr;
    }

	implementFilter() {
		const that = this;
		const newFilters = _.cloneDeep(this.selectedFilters);

		this.searchedCoils = this.allCoils.filter((coil)=> {
			let count = 0;
			const filterLength = this.selectedFilters.length;
			newFilters.map((filter)=> {
			 	if(filter.facetValues.length > 0) {
			 		filter.facetName = this.jsLcfirst(filter.facetName);

				 	if(filter.facetName === 'dateIn') {
				 		const coilDate = new Date(coil[filter.facetName]).getTime();
				 		const index = _.findIndex(filter.facetValues, (item)=> {
				 			const {firstDate, secondDate} = that.convertDates(item.range);
				 			if(firstDate === 'NULL') {
				 				if(coilDate < new Date(secondDate).getTime() ) {
				 					return true;
				 				}
				 			} else if(secondDate === 'NULL') {
				 				if(coilDate >= new Date(firstDate).getTime()) {
				 					return true;
				 				}
				 			} else {
				 				if(coilDate < new Date(secondDate).getTime() && coilDate >= new Date(firstDate).getTime()) {
				 					return true;
				 				}
				 			}
				 			return false;
				 		});

				 		if(index>-1) {
							count++;
						 }

				 	} else if(filter.facetName === 'lengthRemainingFt'){
				 		const coilLength = coil[filter.facetName];
				 		const index = _.findIndex(filter.facetValues, (item)=> {
				 			const {firstL, secondL} = that.convertLength(item.range);
				 			if(firstL === 'NULL') {
				 				if(coilLength < secondL ) {
				 					return true;
				 				}
				 			} else if(secondL === 'NULL') {
				 				if(coilLength >= firstL) {
				 					return true;
				 				}
				 			} else {
				 				if(coilLength < secondL && coilLength >= firstL) {
				 					return true;
				 				}
				 			}
				 			return false;
				 		});
				 		if(index>-1) {
							count++;
						}

				 	} else {
				 		const index = _.findIndex(filter.facetValues, (item)=> {
				 			if(_.isNumber(coil[filter.facetName])) {
				 				return item.range === coil[filter.facetName];
				 			} else {
				 				return item.range.toLowerCase() === coil[filter.facetName].toLowerCase();
				 			}
				 		});
				 		if(index>-1) {
							count++;
						}
				 	}

			 	} else {
			 		count++;
			 	}
			});

			if(count >= filterLength) {
				return true;
			}
			return false;
		});

		this.makeShowedCoils();
	}
}
