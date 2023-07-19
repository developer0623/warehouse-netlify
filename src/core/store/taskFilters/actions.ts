import { createAction, props } from '@ngrx/store';
import { ITaskFacetUserValues } from 'src/core/datatypes';


export const INIT_TASK_FILTERS = 'INIT_TASK_FILTERS';
// export class InitTaskFilters implements Action {
//     readonly type = INIT_TASK_FILTERS;
//     constructor(public payload: ITaskFacetUserValues) {}
// }
export const initTaskFiltersAction = createAction(
    INIT_TASK_FILTERS,
    props<{ payload: ITaskFacetUserValues }>()
  );

export const TOGGLE_TASK_FILTER = 'TOGGLE_TASK_FILTER';
// export class ToggleTaskFilter implements Action {
//     readonly type = TOGGLE_TASK_FILTER;
//     constructor(public payload: {id: string, checked: boolean}) {}
// }

export const toggleTaskFiltersAction = createAction(
    TOGGLE_TASK_FILTER,
    props<{ id: string; checked: boolean }>()
);
