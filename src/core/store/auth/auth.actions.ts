import { IUser } from '../../datatypes';
import { createAction, props } from '@ngrx/store';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginAction = createAction(
    LOGIN_SUCCESS,
    props<IUser>()
);
export const loginFailureAction = createAction(
    LOGIN_FAILURE,
    props<{ payload: any }>()
);
export const logoutAction = createAction(LOGOUT);
