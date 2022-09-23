import { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import { ToastContainer, ToastMessage } from './styles';

interface ToastProps{
  message: string;
}

export function Toast({ message }: ToastProps){
  const { toast, closeToast } = useGlobalContext();

  const toastRef = useRef<HTMLDivElement | null>(null);

  useEffect(() =>{
    const timeout = setTimeout(() =>{
      closeToast();
    }, 3000);

    return () =>{
      clearTimeout(timeout);
    }
  }, []);

  return(
    <ToastContainer>
      <CSSTransition
        in={toast.show}
        nodeRef={toastRef}
        timeout={500}
        unmountOnExit
        classNames="toast-animation"
      >
        <ToastMessage ref={toastRef}>
          {message}
        </ToastMessage>
      </CSSTransition>
    </ToastContainer>
  )
}