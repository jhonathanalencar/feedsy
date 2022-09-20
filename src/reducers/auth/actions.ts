import { ActionTypes, UserType } from './types';

export function signInUserAction(user: UserType):{
  type: ActionTypes.SIGNIN_USER;
  payload: {
    user: UserType;
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

export function updateUserAction(user: UserType):{
  type: ActionTypes.UPDATE_USER;
  payload: {
    user: UserType;
  };
}{
  return{
    type: ActionTypes.UPDATE_USER,
    payload: {
      user,
    },
  }
}