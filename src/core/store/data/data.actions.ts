import { createAction, props } from '@ngrx/store';

export const ALL_DATA = 'ALL_DATA';
export const getAllDataAction = createAction(
  ALL_DATA
);

export const STATE_RESET = 'STATE_RESET';
export const resetStateAction = createAction(
  STATE_RESET
);

export const ADD = '[ADD]';
export const addDataAction = createAction(
  ADD,
  props<{ items: any[]; collection: string }>()
);
// export class AddDatas implements Action {
//   readonly type = ADD;
//   constructor(public payload: {items:any[], collection: string}) {}
// }
export const DELETE = '[DELETE]';
export const deleteDataAction = createAction(
  DELETE,
  props<{ id: any; collection: string }>()
);
// export class DeleteData implements Action {
//   readonly type = DELETE;
//   constructor(public payload: {id:any, collection: string}) {}
// }


export const MODIFY = '[MODIFY]';
export const modifyDataAction = createAction(
  MODIFY,
  props<{ data: any; collection: string }>()
);
// export class ModifyData implements Action {
//   readonly type = MODIFY;
//   constructor(public payload: {data: any, collection: string}) {}
// }



export const SET_FILTERS = 'SET_FILTERS';
// export class SetFilters implements Action {
//   readonly type = SET_FILTERS;
//   constructor(public payload: any[]) {}
// }

export const setFiltersAction = createAction(
  SET_FILTERS,
  props<{ filters: any[] }>()
);

export const CURRENT_ID_ACTION = 'CURRENT_ID_ACTION';
export const currentIdAction = createAction(
  CURRENT_ID_ACTION,
  props<{ payload: any }>()
);
// export class CurrentIdAction implements Action {
//   readonly type = CURRENT_ID_ACTION;
//   constructor(public payload: any) {}
// }

export const UPDATE_MANY = 'UPDATE_MANY';
export const updateManyAction = createAction(
  UPDATE_MANY,
  props<{ items: any[] }>()
);
// export class UpdateMany implements Action {
//   readonly type = UPDATE_MANY;
//   constructor(public payload: {items:any[]}) {}
// }
