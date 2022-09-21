import { ReactNode } from "react";
import { Navigate } from 'react-router-dom';

import { UserType } from "../../reducers/auth/types";

interface ProtectedRouteProps{
  children: ReactNode;
  user: UserType | null;
}

export function ProtectedRoute({ children, user }: ProtectedRouteProps){
  if(!user){
    return <Navigate to="/signin" />
  }

  return (
    <>
      {children}
    </>
  )
}