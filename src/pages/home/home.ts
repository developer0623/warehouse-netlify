import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';

import { Observable, Subscription, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

import { ITask } from '../../core/datatypes';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { DataService } from './../../core/services/data.service';
import { TaskService } from './../../core/services/task.service';
import { CoilService } from './../../core/services/coil.service';
import { WarehouseHubService } from './../../core/services/warehousehub.service';
import { NavService } from './../../core/services/navigation.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

/**
 * Generated class for the TaskListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'app-home',
  templateUrl: 'home.html',
  styleUrls: ['./home.scss']
})
export class HomePage implements OnInit, OnDestroy {

    public allCoils: Array<any> = [];
    public allCoils$: Subscription;
    public visibleTasks$: Observable<ITask[]>;
    public currentTask: ITask;
    public currentTask$: Subscription;

    public progressFlag = false;
    scrollPage$ = new BehaviorSubject<number>(1);
    isPwa = false;

    constructor(public navCtrl: NavController, private dataService: DataService, private taskService: TaskService,
      private warehousehub: WarehouseHubService, private navService: NavService,
      private barcodeScanner: BarcodeScanner, private coilService: CoilService,
      private router: Router) {

        if(environment.mode === 'PWA') {
          this.isPwa = true;
        }

      this.visibleTasks$ = combineLatest([
        this.dataService.dispatchAllTasks(),
        this.dataService.dispatchTaskFilters(),
        this.scrollPage$
      ]).pipe(
        map(([tasks, filters, pageNum]) => {
          const completedTasks = this.sortAndFilter([...tasks]);
          let newTasks = [];
          const locationIds = filters.filters.filter(f => f.checked).map(f => f.filterId);

          // If there are no filters checked, then we just show everything.
          if (locationIds.length === 0) {
            newTasks = completedTasks;
          } else {
            newTasks = completedTasks.filter((t: any) => locationIds.indexOf(t.destinationLocationId) > -1
            || locationIds.indexOf(t.sourceLocationId) > -1);
          }

          return newTasks.slice(0, pageNum*20);
        })
      );

    }

    ngOnInit() {
      this.getAllCoils();
      this.warehousehub.startConnection();
    }

    sortAndFilter(tasks: ITask[]) {
      const sortedTasks = tasks.sort((a, b) => a.requiredDate < b.requiredDate ? -1 : 1);
      const filteredTasks = sortedTasks.filter(t => t.taskState !== 'Complete');
      return filteredTasks;
    }

    getAllCoils() {
      if (this.allCoils$ !== undefined) {
            this.allCoils$.unsubscribe();
      }
     this.allCoils$ = this.dataService.dispatchAllCoils()
     .subscribe((data) => {
         this.allCoils = _.cloneDeep(data);
       }
      );
    }


    ionViewDidEnter() {
      this.getCurrentTask();
    }

    getCurrentTask() {
      if (this.currentTask$ !== undefined) {
        this.currentTask$.unsubscribe();
      }
      this.currentTask$ = this.taskService.dispatchCurrentTask().subscribe((task)=>{
        this.currentTask = _.cloneDeep(task);
        if(this.currentTask.taskState === 'InProcess' || this.currentTask.taskState === 'In Transit') {
          this.progressFlag = true;
        } else {
          this.progressFlag = false;
        }
      });
    }


    doInfinite(ev) {
      this.scrollPage$.next(this.scrollPage$.value + 1);
      setTimeout(() => {
        (ev as InfiniteScrollCustomEvent).target.complete();
      }, 500);
    }


    onClickTask(task) {
      if(this.currentTask.taskState === 'InProcess' || this.currentTask.taskState === 'In Transit') {
        this.currentTask.taskState = 'Ready';
        this.taskService.dispatchReadyTask(this.currentTask);
      }

      this.taskService.dispatchViewTask(task);
      console.log('task----', task);
      this.navService.gotoNewPage('task-detail');
    }

    onFilter() {
      this.navService.gotoNewPage('all-coil', {taskFlag: false});
    }

    gotoScan() {
      this.barcodeScanner.scan().then((barcodeData) => {
         this.searchCoil(barcodeData.text);
      }, (err) => {
          alert(JSON.stringify(err));
      });
    }

    searchCoil(coilid) {
      const coil = this.allCoils.find((item: any)=> item.id === coilid);
      if(coil) {
        this.coilService.dispatchViewCoil(coil);
        this.navService.gotoNewPage('search-coil-detail');
      } else {
        alert('There is no coil');
      }
    }

    gotoProgress() {
      if(this.currentTask.taskState === 'InProcess') {
        this.navService.gotoNewPage('task-detail');
      } else if(this.currentTask.taskState === 'In Transit') {
        this.navService.gotoNewPage('deliver');
      }
    }

    ngOnDestroy() {
    }

}
