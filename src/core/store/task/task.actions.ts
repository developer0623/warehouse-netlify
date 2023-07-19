import { createAction, props } from '@ngrx/store';
import { ITask } from '../../datatypes';


export const VIEW_TASK = 'VIEW_TASK';
// export class ViewTask implements Action {
//   readonly type = VIEW_TASK;

//   constructor(public payload: any) {}
// }
export const viewTaskAction = createAction(
  VIEW_TASK,
  props<any>()
);

export const SELECT_COIL_TASK = 'SELECT_COIL_TASK';
// export class SelectCoil implements Action {
//   readonly type = SELECT_COIL_TASK;

//   constructor(public payload: any) {}
// }
export const selectCoilAction = createAction(
  SELECT_COIL_TASK,
  props<any>()
);

export const COMPLETE = 'COMPLETE';
// export class Complete implements Action {
//   readonly type = COMPLETE;

//   constructor(public payload: any) {}
// }
export const completeAction = createAction(
  COMPLETE,
  props<any>()
);

export const CANCEL_TASK = 'CANCEL_TASK';
// export class CancelTask implements Action {
//   readonly type = CANCEL_TASK;
//   constructor(public payload: {taskId: any, coilId:any, locationId:any}) {}
// }

export const cancelTaskAction = createAction(
  CANCEL_TASK,
  props<{ taskId: any; coilId: any; locationId: any }>()
);

export const RESET_TASK = 'RESET_TASK';
// export class ResetTask implements Action {
//   readonly type = RESET_TASK;

//   constructor(public payload: any) {}
// }

export const resetTaskAction = createAction(
  RESET_TASK,
  props<any>()
);


export const READY_TASK = 'READY_TASK';
// export class ReadyTask implements Action {
//   readonly type = READY_TASK;

//   constructor(public payload: any) {}
// }
export const readyTaskAction = createAction(
  READY_TASK,
  props<any>()
);

export const UNNATTANINABLE_TASK = 'UNNATTANINABLE_TASK';
// export class UnattaniableTask implements Action {
//   readonly type = UNNATTANINABLE_TASK;

//   constructor(public payload: {task: ITask, reason: any}) {}
// }

export const unattaninableTaskAction = createAction(
  UNNATTANINABLE_TASK,
  props<{task: ITask; reason: any}>()
);






