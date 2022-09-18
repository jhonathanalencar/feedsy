import { User } from 'firebase/auth'

// export type User = {
//   id: string;
//   username: string;
//   email: string;
//   userAvatar?: string;
//   createdAt: Date;
// }

export enum ActionTypes{
  SIGNIN_USER = 'SIGNIN_USER',
  REMEMBER_USER = 'REMEMBER_USER',
}

interface SignInUserAction{
  type: ActionTypes.SIGNIN_USER;
  payload: {
    user: User,
  };
}

interface RememberUserCredentialsAction{
  type: ActionTypes.REMEMBER_USER;
  payload: {
    isChecked: boolean,
  };
}

export type Action = SignInUserAction | RememberUserCredentialsAction;