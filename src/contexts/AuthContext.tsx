import { createContext, ReactNode, useEffect, useReducer } from "react";
import { 
  rememberUserCredentialsAction, 
  signInUserAction, 
  updateUserAction,
  signoutUserAction,
} from "../reducers/auth/actions";
import { authReducer } from "../reducers/auth/reducer";
import { UserType } from "../reducers/auth/types";

interface AuthContextData{
  user: UserType | null;
  signInUser: (user: UserType) => void;
  rememberUserCredentials: (isChecked: boolean) => void;
  updateUser: (user: UserType) => void;
  signOutUser: () => void;
}

interface AuthContextProviderProps{
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps){
  const initialState = {
    user: null,
    persist: false,
  }

  const [authState, dispatch] = useReducer(
    authReducer,
    initialState,
    () =>{
      const storedStateAsJson = localStorage.getItem('@feedsy:auth-state-0.0.1');
      
      if(storedStateAsJson){
        return JSON.parse(storedStateAsJson);
      }else{
        return initialState;
      }
    }
  );

  const { user, persist } = authState;

  function signInUser(user: UserType){
    dispatch(signInUserAction(user));
  }

  function rememberUserCredentials(isChecked: boolean){
    dispatch(rememberUserCredentialsAction(isChecked));
  }

  function updateUser(user: UserType){
    dispatch(updateUserAction(user));
  }

  function signOutUser(){
    dispatch(signoutUserAction());

    localStorage.removeItem('@feedsy:auth-state-0.0.1');
  }

  useEffect(() =>{
    if(persist){
      const stateJSON = JSON.stringify(authState);
  
      localStorage.setItem('@feedsy:auth-state-0.0.1', stateJSON);
    }
  }, [authState]);

  return(
    <AuthContext.Provider value={{
      user,
      signInUser,
      rememberUserCredentials,
      updateUser,
      signOutUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}