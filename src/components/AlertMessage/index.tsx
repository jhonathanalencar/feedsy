import { HTMLAttributes, RefObject } from 'react';
import { Error } from './styles';

interface AlertMessageProps extends HTMLAttributes<HTMLSpanElement>{
  message: string;
  alertRef: RefObject<HTMLSpanElement>;
  type: 'success' | 'error';
}

export function AlertMessage({ message, type, alertRef, ...rest }: AlertMessageProps){
  return(
    <Error 
      ref={alertRef}
      type={type} 
      {...rest}
    >
      {message}
    </Error>
  )
}