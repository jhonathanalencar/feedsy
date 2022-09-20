import { User } from 'firebase/auth'
import { Timestamp } from 'firebase/firestore';

export type UserType = {
  id: string;
  username: string;
  email: string;
  createdAt: Timestamp;
  userAvatar?: string;
}

export enum ActionTypes{
  SIGNIN_USER = 'SIGNIN_USER',
  REMEMBER_USER = 'REMEMBER_USER',
  UPDATE_USER = 'UPDATE_USER',
}

interface SignInUserAction{
  type: ActionTypes.SIGNIN_USER;
  payload: {
    user: UserType,
  };
}

interface RememberUserCredentialsAction{
  type: ActionTypes.REMEMBER_USER;
  payload: {
    isChecked: boolean,
  };
}

interface UpdateUserAction{
  type: ActionTypes.UPDATE_USER;
  payload: {
    user: UserType,
  };
}

export type Action = SignInUserAction | RememberUserCredentialsAction | UpdateUserAction;