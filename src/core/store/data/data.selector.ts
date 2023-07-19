import { AppState } from '../index';
import { ITask, ITaskCoil } from  'src/core/datatypes';

export const getAllTasks = (state: AppState) => state.data.MaterialTask;

export const getAllLocations = (state: AppState) => state.data.Location;


export const getAllCoils = (state: AppState) => state.data.Coil;

export const getTaskCoils = (state: AppState) => state.data.Coil.map(coil => (
	{...coil, location: state.data.Location.find(l => l.id === coil.locationId) || {id:'UNK', name:'UNKNOWN', code: 'UNK'}} as ITaskCoil
));



export const getCoilFilters = (state: AppState) => state.data.coilFilters;


export const getTaskFilters = (state: AppState) => state.data.taskFilters;

// export const getNonpreferredReasons = (state: AppState) => state.data.nonpreferredReasons;

// export const getUnattainableReasons = (state: AppState) => state.data.unattainableReasons;

export const getReasons = (state: AppState) => state.data.ReasonCode;

// export const getAllMachines = (state: AppState) => state.data.machines;


export const currentTask = (state: AppState) => {
	const task = localStorage.getItem('task');
	if(!state.task.id && task) {
    state = {...state, task: JSON.parse(task)};
		return JSON.parse(task) as ITask;
	}
	return state.task;
};


export const currentCoil = (state: AppState) => {
	const coil = localStorage.getItem('coil');
	if(!state.coil.id && coil) {
    state = {...state, coil: JSON.parse(coil)};
		return JSON.parse(coil) as ITaskCoil;
	}
	return state.coil;
};

export const userTaskFilterValues = (state: AppState) => state.userTaskFilterValues;

export const getUserSelector = (state: AppState) => state.user;

