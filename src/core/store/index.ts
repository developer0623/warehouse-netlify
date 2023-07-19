
import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { dataReducer } from './data/data.reducer';
import { taskReducer } from './task/task.reducer';
import { coilReducer } from './coil/coil.reducer';
import { taskFiltersReducer } from './taskFilters/reducer';
import { authReduer } from './auth/auth.reducer';
import { ITask, ICoil, ISearchFacet, ITaskFacetDef, ITaskFacetUserValues, ITaskCoil, ILocation, IReasonCode, IUser } from '../datatypes';


export interface DataState {
  MaterialTask: Array<ITask>;
  Coil: Array<ICoil>;
  Location: Array<ILocation>;
  ReasonCode: Array<IReasonCode>;
  coilFilters: Array<ISearchFacet>;
  taskFilters: Array<ITaskFacetDef>;
  signalRstate?: any;
}

export interface AppState {
  task: ITask;
  data: DataState;
  coil: ITaskCoil;
  userTaskFilterValues: ITaskFacetUserValues;
  user: IUser;
}

const reducers: ActionReducerMap<AppState>  = {
  task: taskReducer,
  data: dataReducer,
  coil: coilReducer,
  userTaskFilterValues: taskFiltersReducer,
  user: authReduer
};

export const debug = (reducer: ActionReducer<any>): ActionReducer<any> => (state, action) => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };

export const metaReducers: MetaReducer<any>[] = [debug];


@NgModule({
  imports: [
    // StoreModule.forRoot(reducers, {metaReducers}),
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  declarations: [],
  exports: [],
  providers: []
})
export class CoreStoreModule {}
