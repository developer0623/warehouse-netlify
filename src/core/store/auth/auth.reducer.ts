import { createReducer, on } from '@ngrx/store';
import { loginAction, logoutAction } from './auth.actions';
import { IUser } from  'src/core/datatypes';


export const initUser: IUser = {
  username: '',
  password: '',
  url: ''
};

export const authReduer = createReducer(
  initUser,
  on(loginAction, (state, user) => ({...user})),
  on(logoutAction, (state) => initUser),
);
