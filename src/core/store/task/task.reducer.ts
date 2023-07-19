
import { createReducer, on } from '@ngrx/store';
import { ITask } from '../../datatypes';
import * as taskActions from './task.actions';

export const initialTask: ITask = {
  id: null,
  taskType: null,
  coilType: null,
  requiredFt: null,
  source: null,
  destination: null,
  requiredDate: null,
  taskState: null,
  preferredCoils: [],
  nonpreferredCoils: [],
  userName: '',
  destinationLocationId: null,
  sourceLocationId: null
};
export const taskReducer = createReducer(
  initialTask,
  on(taskActions.viewTaskAction, (state, task) => {
    state = { ...task};
    if(task !== null) {
      state.taskState = 'InProcess';
    }
    localStorage.setItem('task', JSON.stringify(state));
    return { ...state};
  }),
  on(taskActions.unattaninableTaskAction, (state) => {
    const newState = { ...state, taskState: 'Unnattainable'};
    localStorage.setItem('task', JSON.stringify(newState));
    return newState;
  }),
  on(taskActions.readyTaskAction, (state) => {
    const newState = { ...state, taskState: 'Ready'};
    localStorage.setItem('task', JSON.stringify(newState));
    return newState;
  }),
  on(taskActions.selectCoilAction, (state) => {
    const newState = { ...state, taskState: 'In Transit'};
    localStorage.setItem('task', JSON.stringify(newState));
    return newState;
  }),
  on(taskActions.completeAction, (state) => {
    const newState = { ...initialTask};
    localStorage.setItem('task', JSON.stringify(newState));
    return newState;
  }),
  on(taskActions.cancelTaskAction, (state) => {
    const newState = { ...initialTask};
    localStorage.setItem('task', JSON.stringify(newState));
    return newState;
  })
);
