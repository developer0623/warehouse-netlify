// Middle ware
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from'@ngrx/effects';
import { Action } from '@ngrx/store';
import { exhaustMap, tap } from 'rxjs/operators';

import * as DataActions from '../store/data/data.actions';
import * as TaskActions from '../store/task/task.actions';
import * as CoilActions from '../store/coil/coil.actions';
import { DataProvider } from '../../core/providers/provider';

import { initialTask} from '../store/task/task.reducer';
import { initialCoil } from '../store/coil/coil.reducer';
import { TOGGLE_TASK_FILTER } from '../store/taskFilters/actions';

import { LoadingService } from '../services/loading.service';

@Injectable()
export class DataEffect {

  getData$ = createEffect(() => this.actions$.pipe(
      ofType(DataActions.ALL_DATA),
      tap(() => {
        if(!this.loadingService.loadingFlag) {
          this.loadingService.showLoading();
        }
        this.dataProvider.resetAuthFailedCount();
        this.dataProvider.getLocations(0, 1024);
        this.dataProvider.getTasks(0, 1024);
        this.dataProvider.getUsersTaskFilterValues();
        this.dataProvider.getCoils(0, 1024);
        this.dataProvider.getTaskFilters(0, 1024);
        this.dataProvider.getCoilFilters(0, 1024);
        this.dataProvider.getReasons(0, 1024);
    })
    ), { dispatch: false });

  changeTaskFilter$ = createEffect(() => this.actions$.pipe(
      ofType(TOGGLE_TASK_FILTER),
      tap((action: any) => {
        this.dataProvider.changeTaskFilter({id: action.id, checked: action.checked});
    })
    ), { dispatch: false });

  reset$ = createEffect(() => this.actions$.pipe(
      ofType(DataActions.STATE_RESET),
      tap((action: any) => {
        CoilActions.viewCoilAction({coil: initialCoil});
        TaskActions.resetTaskAction({payload: initialTask});
    })
    ), { dispatch: false });

    constructor(
      private actions$: Actions,
      private dataProvider: DataProvider,
      private loadingService: LoadingService
    ){ }
}
