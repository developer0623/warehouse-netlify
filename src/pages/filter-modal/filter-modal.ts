import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';

import { DataService } from '../../core/services/data.service';
import { TaskService } from '../../core/services/task.service';


import { Observable } from 'rxjs';
import { ITask, ISearchFacet } from '../../core/datatypes';
import * as _ from 'lodash';

@Component({
  selector: 'app-filter-modal',
  templateUrl: 'filter-modal.html',
  styleUrls: ['./filter-modal.scss']
})
export class FilterModalPage {

  public filters: Array<ISearchFacet>;
  public selectedFilters: any[];
	public sortItems: Array<any> = [
		{id: 0, title: 'Coil ID', checked: true},
		{id: 1, title: 'Age', checked: false},
		{id: 2, title: 'Length', checked: false}
	];
	public selectedSort: any;
  	public sortIndex: number;
	public sortFlag = false;
	public filterCount = 0;
	public itemCount = 0;

	public taskFlag = false;
	public seletedTask: Observable<ITask>;

	constructor(
		public navCtrl: NavController,
		private modalCtrl: ModalController,
		private navparams: NavParams,
		private taskService: TaskService,
		private dataService: DataService
	) {

		this.taskFlag = this.navparams.get('taskFlag');
		this.sortIndex = this.navparams.get('sortIndex');
		this.selectedFilters = this.navparams.get('selectedFilters');
		this.selectedSort = this.sortItems[this.sortIndex];
			if(this.taskFlag) {
				this.seletedTask = this.taskService.dispatchCurrentTask();
			}

		this.getAllFilter();
	}

	getAllFilter() {
		this.dataService.dispatchCoilFilters().subscribe(
			(filters)=> {
				this.filters = filters;
				if(!this.selectedFilters.length) {
          this.filters = filters.map((filter) => {
            this.selectedFilters.push({...filter, facetValues: []});
            const facetValues = filter.facetValues.map(item => (
              {...item, selected: false}
            ));
            return { ...filter, checked: false, facetValues};
          });
				} else {
					this.selectedFilters.map((filter)=> {
						filter.facetValues.map(item=> {
              this.filterCount++;
              this.itemCount+= item.count;
						});
					});
				}

			}
		);

  	}

  	onClickSort() {
  		this.sortFlag = !this.sortFlag;
  	}

  	onClickSortItem(selecteditem) {
  		this.sortItems.map((item)=> {
  			if(item.id === selecteditem.id) {
  				item.checked = true;
  			} else {
  				item.checked = false;
  			}
  		});
      this.sortIndex = selecteditem.id;
  		this.selectedSort = selecteditem;
  		this.sortFlag = !this.sortFlag;

  	}

  	onClickFilter(filter) {
  		filter.checked = !filter.checked;
  	}

  	onClickFilterItem(item, index) {

      item.selected = !item.selected;
      if(item.selected) {
        this.selectedFilters[index].facetValues.push(item);
        this.filterCount ++;
        this.itemCount += item.count;
      } else {
        this.selectedFilters[index].facetValues = this.selectedFilters[index].facetValues.filter((filter)=> filter.title !== item.title);
          this.filterCount --;
          this.itemCount -= item.count;
      }

  	}

  	onClearFilter() {
  		this.filterCount =0;
  		this.itemCount = 0;
  		this.filters.map((filter: any, index) => {
        this.selectedFilters[index].facetValues = [];
  			filter.checked = false;
  			filter.facetValues.map(item=> {
  				item.selected = false;
  			});
  		});
  	}



	goback() {
		// this.dataService.dispatchSetFilters(this.filters);
		this.modalCtrl.dismiss({count:this.filterCount, sortIndex: this.sortIndex, selectedFilters: this.selectedFilters});
	}

}
