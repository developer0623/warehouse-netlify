import { props, createAction } from '@ngrx/store';
import { ITaskCoil } from 'src/core/datatypes';

export const VIEW_COIL = 'VIEW_COIL';

export const viewCoilAction = createAction(
  VIEW_COIL,
  props<{ coil: ITaskCoil }>()
);

export const SET_LOCATION = 'SET_LOCATION';

export const setLocationAction = createAction(
  SET_LOCATION,
  props<{ location: any }>()
);


