import { collection, getDocs } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { produce } from 'immer';
import { UserType } from './types';

import { Action, ActionTypes } from './types';

export interface AuthState{
  user: UserType | null;
  persist: boolean;
}

export function authReducer(state: AuthState, action: Action){
  switch(action.type){
    case ActionTypes.SIGNIN_USER:{
      return produce(state, (draft) =>{
        draft.user = action.payload.user;
      });
    }
    case ActionTypes.REMEMBER_USER:{
      return produce(state, (draft) =>{
        draft.persist = action.payload.isChecked;
      });
    }
    case ActionTypes.UPDATE_USER:{
      return produce(state, (draft) =>{
        draft.user = action.payload.user;
      });
    }
    default:
      return state;
  }
}