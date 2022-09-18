import { ActionTypes } from './types';
import { User } from 'firebase/auth'

export function signInUserAction(user: User):{
  type: ActionTypes.SIGNIN_USER;
  payload: {
    user: User;
  };
}{
  return{
    type: ActionTypes.SIGNIN_USER,
    payload: {
      user,
    },
  }
}

export function rememberUserCredentialsAction(isChecked: boolean):{
  type: ActionTypes.REMEMBER_USER;
  payload: {
    isChecked: boolean,
  };
}{
  return{
    type: ActionTypes.REMEMBER_USER,
    payload: {
      isChecked,
    },
  }
}
