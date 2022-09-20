import { createContext, ReactNode, useEffect, useReducer } from "react";
import { rememberUserCredentialsAction, signInUserAction, updateUserAction } from "../reducers/auth/actions";
import { authReducer } from "../reducers/auth/reducer";
import { UserType } from "../reducers/auth/types";

interface AuthContextData{
  user: UserType | null;
  signInUser: (user: UserType) => void;
  rememberUserCredentials: (isChecked: boolean) => void;
  updateUser: (user: UserType) => void;
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
      const storedStateAsJson = localStorage.getItem('@feedsy:auth-state-1.0');
      
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

  useEffect(() =>{
    if(persist){
      const stateJSON = JSON.stringify(authState);
  
      localStorage.setItem('@feedsy:auth-state-1.0', stateJSON);
    }
  }, [authState]);

  return(
    <AuthContext.Provider value={{
      user,
      signInUser,
      rememberUserCredentials,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}