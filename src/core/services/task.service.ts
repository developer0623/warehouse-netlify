import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as TaskActions from '../store/task/task.actions';
import * as DataSelector  from '../store/data/data.selector';
// import { ITask, ITaskCoil } from "../datatypes";




@Injectable()
export class TaskService {

  constructor(
  	private store: Store<any>
   ) {
  }

  dispatchViewTask(task) {
    this.store.dispatch(TaskActions.viewTaskAction(task));
  }
  dispatchReadyTask(task) {
    this.store.dispatch(TaskActions.readyTaskAction(task));
  }
  dispatchUnnattainableTask(task, reason) {
    this.store.dispatch(TaskActions.unattaninableTaskAction({task, reason}));
  }

  dispatchCancelTask(taskId: string, coilId: string, locationId: string) {
    this.store.dispatch(TaskActions.cancelTaskAction({taskId, coilId, locationId}));
  }

  dispatchSelectedCoil(coil, task) {
    // this.store.dispatch(TaskActions.selectCoilAction({coil, task}));
    this.store.dispatch(TaskActions.selectCoilAction({coil, task}));
  }

  dispatchCompletedTask(task) {
    this.store.dispatch(TaskActions.completeAction(task));
  }

  dispatchCurrentTask(): Observable<any>{
  	return this.store.select(DataSelector.currentTask);
  }

}
