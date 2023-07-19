import { createReducer, on } from '@ngrx/store';
import * as dataActions from './data.actions';

import { DataState } from '../index';
import * as _ from 'lodash';

// let taskFilter = [{id:}]
const initialState: DataState = {
  MaterialTask: [],
  Coil: [],
  Location: [],
  ReasonCode: [],
  coilFilters: [],
  taskFilters: []

};

export const dataReducer = createReducer(
  initialState,
  on(dataActions.getAllDataAction, (state) => state ),
  on(dataActions.resetStateAction, (state) => state ),
  on(dataActions.addDataAction, (state, { items, collection }) => {
    const newItems = [...state[collection], ...items];
    return {...state, [collection]: newItems };
  }),
  on(dataActions.setFiltersAction, (state, { filters }) => {
    state.coilFilters = filters;
    state.coilFilters.map((item: any)=> {
      item.checked = false;
    });
    return {...state};
  }),
  on(dataActions.deleteDataAction, (state, { id, collection }) => {
    const newItems = state[collection].filter(t => t.id !== id);
    return {...state, [collection]: newItems};
  }),
  on(dataActions.modifyDataAction, (state, { data, collection }) => {
    const removed = state[collection].filter(x => x.id !== data.id).concat([data]);
    return {...state, [collection]: removed};
  }),
  on(dataActions.currentIdAction, (state, { payload }) => ({...state, signalRstate: payload})),
  on(dataActions.updateManyAction, (state, { items }) => {
    const newState = {...state};
    items.forEach(i=>{
      newState[i.collection] = newState[i.collection].filter(x=>x.id !== i.data.id).concat(i.data);
    });

    return newState;
  }),
);
