import { createContext, ReactNode, useEffect, useReducer } from "react";
import { rememberUserCredentialsAction, signInUserAction } from "../reducers/auth/actions";
import { authReducer } from "../reducers/auth/reducer";
import { User } from 'firebase/auth'

// interface User{
//   id: string;
//   email: string;
//   username: string;
//   createdAt: Date;
//   userAvatar?: string;
// }

interface AuthContextData{
  user: User | null;
  signInUser: (user: User) => void;
  rememberUserCredentials: (isChecked: boolean) => void;
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

  function signInUser(user: User){
    dispatch(signInUserAction(user));
  }

  function rememberUserCredentials(isChecked: boolean){
    dispatch(rememberUserCredentialsAction(isChecked));
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
    }}>
      {children}
    </AuthContext.Provider>
  )
}