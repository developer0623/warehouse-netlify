import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { exhaustMap, tap } from 'rxjs/operators';
import * as TaskActions from '../store/task/task.actions';
import { DataProvider } from '../../core/providers/provider';


@Injectable()
export class TaskEffect {



  viewTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.VIEW_TASK),
    tap((action: any) => {
      this.dataProvider.setViewtask(action);
  })
  ), { dispatch: false });

  readyTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.READY_TASK),
    tap((action: any) => {
      this.dataProvider.setReadytask(action);
  })
  ), { dispatch: false });

  unattainableTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.UNNATTANINABLE_TASK),
    tap((action: any) => {
      this.dataProvider.setUnnattainabletask(action.task, action.reason);
  })
  ), { dispatch: false });

  selectedCoil$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.SELECT_COIL_TASK),
    tap((action: any) => {
      this.dataProvider.setSelectCoiloftask(action.coil, action.task);
  })
  ), { dispatch: false });

  completedTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.COMPLETE),
    tap((action: any) => {
      this.dataProvider.completedTask(action.id, action.destinationLocationId);
  })
  ), { dispatch: false });

  cancelTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.CANCEL_TASK),
    tap((action: any) => {
      this.dataProvider.cancelTask({taskId: action.taskId, coilId: action.coilId, locationId: action.locationId});
  })
  ), { dispatch: false });

    constructor(
      private actions$: Actions,
      private dataProvider: DataProvider
    ) {
    }

}
