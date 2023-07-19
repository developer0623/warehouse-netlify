import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-task-item',
  templateUrl: 'task-item.html',
  styleUrls: ['task-item.scss']
})
export class TaskItemComponent implements OnInit, OnDestroy{

	@Input() task: any;
	public destination = '';
  public source = '';
  public locations$: Subscription;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    if(this.locations$ !== undefined) {
      this.locations$.unsubscribe();
    }
  	this.locations$ = this.dataService.dispatchAllLocations()
      .subscribe((results: any) => {
        // console.log('2222222', this.task, results);
      	// let aa = results.find(item=> item.id === this.task.destinationLocationId);
      	// this.task.destination = aa.name;

        if (!this.task.destinationLocationId && this.task.taskType === 'MachineToWarehouse'){
          this.task.destination = 'Warehouse';
        } else {
          const destinationLoc = results.find(item=> item.id === this.task.destinationLocationId);
          if(destinationLoc) {
            this.destination = destinationLoc.name;
          }
        }

        if (!this.task.sourceLocationId && this.task.taskType === 'WarehouseToMachine'){
          this.task.source = 'Warehouse';
        } else {
          const sourceLoc = results.find(item=> item.id === this.task.sourceLocationId);
          if(sourceLoc) {
            this.source = sourceLoc.name;
          }
        }
    });
  }

  ngOnDestroy(): void {
    this.locations$.unsubscribe();
  }
}
