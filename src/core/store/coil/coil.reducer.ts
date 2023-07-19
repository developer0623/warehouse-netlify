import { createReducer, on } from '@ngrx/store';
import { viewCoilAction, setLocationAction } from './coil.actions';
import { ITaskCoil } from  'src/core/datatypes';


export const initialCoil: ITaskCoil = {
  id: null,
  dateIn: null,
  coilTypeCode: null,
  materialType: null,
  color: null,
  gauge: null,
  widthIn: null,
  lengthRemainingFt: null,
  lengthStartFt: null,
  locationId: null,
  location: null,
  vendor: null,
  heat: null,
  consignment: null,
};

export const coilReducer = createReducer(
  initialCoil,
  on(viewCoilAction, (state, { coil }) => {
    localStorage.setItem('coil', JSON.stringify(coil));
    return { ...coil };
  }),
  on(setLocationAction, (state, { location }) => {
    const newState = { ...state, location };
    localStorage.setItem('coil', JSON.stringify(newState));
    return newState;
  }),
);
