import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalFooService } from '../services/globalFoo.service';

import * as DataActions from '../store/data/data.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/index';
import { UrlService } from './url';
import * as dto from '../datatypes';
import { initTaskFiltersAction } from '../store/taskFilters/actions';
import { ITaskFacetUserValues } from '../datatypes';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class DataProvider {

  private apiUrl = '/_api/warehouse/';
  private authFailedCount = 0;
  private dataCount = 0;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private urlService: UrlService,
    private globalFooService: GlobalFooService,
    private loadingService: LoadingService
  ) { }

  resetAuthFailedCount() {
    this.authFailedCount = 0;
  }

  checkDataCount() {
    this.dataCount++;
    if(this.dataCount>=5 && this.loadingService.loadingFlag) {
      this.loadingService.removeLoading();
      this.dataCount = 0;
    }
  }

  getTasks(skip, take) {
    const url = this.urlService.getMainUrl() + `${this.apiUrl}tasks?skip=${skip}&take=${take}`;

    this.http.get(url)
    .subscribe({
      next: (result: dto.ITask[]) => {
        this.store.dispatch(
          DataActions.addDataAction({items: result, collection: 'MaterialTask'})
        );
        if(result.length>=1024) {
          this.getTasks(skip+1024, 1024);
        } else {
          this.checkDataCount();
        }
      },
      error: err=> {
        if(err.status === 401 && this.authFailedCount < 4) {
          this.authFailedCount++;
          this.getTasks(skip, 1024);
        } else {
          this.globalFooService.publishSomeData({
            status: 'user:logout'
          });
        }
      }

    });
  }
  getCoils(skip, take) {
    const url = this.urlService.getMainUrl() + `${this.apiUrl}coils?skip=${skip}&take=${take}`;
    this.http.get(url)
    .subscribe({
      next: (result: dto.ICoil[])=> {
        this.store.dispatch(
          DataActions.addDataAction({items: result, collection: 'Coil'})
        );
        if(result.length>=1024) {
          this.getCoils(skip+1024, 1024);
        } else {
          this.checkDataCount();
        }
      },
      error: err=> {
        if(err.status === 401 && this.authFailedCount < 4) {
          this.authFailedCount++;
          this.getCoils(skip, 1024);
        } else {
          this.globalFooService.publishSomeData({
            status: 'user:logout'
          });
        }
      }

    });
  }

  getLocations(skip, take) {
    const url = this.urlService.getMainUrl() + `${this.apiUrl}locations?skip=${skip}&take=${take}`;
    this.http.get(url)
    .subscribe({
      next: (result: Array<any>)=> {
        this.store.dispatch(
          DataActions.addDataAction({items: result, collection: 'Location'})
        );
        if(result.length>=1024) {
          this.getLocations(skip+1024, 1024);
        } else {
          this.checkDataCount();
        }
      },
      error: err=> {
        if(err.status === 401 && this.authFailedCount < 4) {
          this.authFailedCount++;
          this.getLocations(skip, 1024);
        } else {
          this.globalFooService.publishSomeData({
            status: 'user:logout'
          });
        }
      }

    });
  }
  getReasons(skip, take){
    const url = this.urlService.getMainUrl() + `${this.apiUrl}reasons?skip=${skip}&take=${take}`;
    this.http.get(url).subscribe({
      next: (result: Array<any>)=> {
        this.store.dispatch(
          DataActions.addDataAction({items: result, collection: 'ReasonCode'})
        );
        if(result.length>=1024) {
          this.getReasons(skip+1024, 1024);
        } else {
          this.checkDataCount();
        }
      },
      error: err=> {
        if(err.status === 401 && this.authFailedCount < 4) {
          this.authFailedCount++;
          this.getReasons(skip, 1024);
        } else {
          this.globalFooService.publishSomeData({
            status: 'user:logout'
          });
        }
      }
    });
  }

  getTaskFilters(skip, take) {
    const url = this.urlService.getMainUrl() + `${this.apiUrl}facets/tasks`;
    this.http.get(url).subscribe({
      next: (result: Array<any>)=> {
        this.store.dispatch(
          DataActions.addDataAction({items: result, collection: 'taskFilters'})
        );
        if(result.length>=1024) {
          this.getTaskFilters(skip+1024, 1024);
        } else {
          this.checkDataCount();
        }
      },
      error: err=> {
        if(err.status === 401 && this.authFailedCount < 4) {
          this.authFailedCount++;
          this.getTaskFilters(skip, 1024);
        } else {
          this.globalFooService.publishSomeData({
            status: 'user:logout'
          });
        }
      }
    });
  }

  getUsersTaskFilterValues() {
    const url = this.urlService.getMainUrl() + `${this.apiUrl}filters/task`;
    this.http.get(url).subscribe({
      next: (result: ITaskFacetUserValues) => {
        this.store.dispatch(
          initTaskFiltersAction({payload: result})
        );
      },
      error: err => {
        if(err.status === 401 && this.authFailedCount < 4) {
          this.getUsersTaskFilterValues();
        }
      }
    });
  }

  getCoilFilters(skip, take) {
    const url = this.urlService.getMainUrl() + `${this.apiUrl}facets/coils`;
    this.http.get(url).subscribe({
      next: (result: Array<any>)=> {
        this.store.dispatch(
          DataActions.addDataAction({items: result, collection: 'coilFilters'})
        );
        if(result.length>=1024) {
          this.getCoilFilters(skip+1024, 1024);
        } else {
          this.checkDataCount();
        }
      },
      error: err=> {
        if(err.status === 401 && this.authFailedCount < 4) {
          this.authFailedCount++;
          this.getCoilFilters(skip, 1024);
        } else {
          this.globalFooService.publishSomeData({
            status: 'user:logout'
          });
        }
      }
    });

  }


  setViewtask(task) {
    // const user = JSON.parse(localStorage.getItem('user'));
    this.http.post(this.urlService.getMainUrl() + `${this.apiUrl}task/inprocess`, {TaskId:task.id})
      .subscribe({
        next: (result: Array<any>)=> {
        },
        error: err=> {
          console.error('setViewtask', err);
        }
      });
  }

  setReadytask(task) {
    this.http.post(this.urlService.getMainUrl() + `${this.apiUrl}task/ready`, {TaskId: task.id})
    .subscribe({
      next: (result: Array<any>)=> {
      },
      error: err=> {
        console.error('setReadytask', err);
      }
    });
  }

  setUnnattainabletask(task, reason) {
    this.http.post(this.urlService.getMainUrl() + `${this.apiUrl}task/unattainable`, {TaskId: task.id, unnattainableCode:reason})
    .subscribe({
      next: (result: Array<any>)=> {
      },
      error: err=> {
        console.error('setUnnattainabletask', err);
      }
    });
  }

  setSelectCoiloftask(coil, task) {
    const param = { TaskId: task.id, CoilId: coil.id, overrideCode: task.overrideCode };

    this.http.post(this.urlService.getMainUrl() + `${this.apiUrl}task/intransit`, param)
    .subscribe({
      next: (result: Array<any>)=> {
      },
      error: err=> {
        console.error('setSelectCoiloftask', err);
      }
    });
  }

  completedTask(taskId, locationId) {

    const param = {TaskId: taskId, LocationId: locationId};


    this.http.post(this.urlService.getMainUrl() + `${this.apiUrl}task/complete`, param)
    .subscribe({
      next: (result: Array<any>)=> {
      },
      error: err=> {
        console.error('completedTask', err);
      }
    });
  }

  cancelTask(param: { taskId: string; coilId: string; locationId: string }) {

    this.http.post(this.urlService.getMainUrl() + `${this.apiUrl}task/cancel`, param)
    .subscribe({
      next: (result: Array<any>)=> {
      },
      error: err=> {
        console.error('cancelTask', err);
      }
    });
  }

  changeTaskFilter(filter: { id; checked }) {

    const param = {
      filter: {
        filterId: filter.id,
        checked: filter.checked
      }};


    this.http.post(this.urlService.getMainUrl() + `${this.apiUrl}filters/task`, param)
    .subscribe({
      next: (result: Array<any>)=> {
      },
      error: err=> {
        console.error('changeTaskFilter', err);
      }
    });
  }
}
