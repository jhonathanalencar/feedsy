import { useRef } from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { PostDialog } from "../../components/PostDialog";
import { Posts } from "../../components/Posts";
import { Toast } from '../../components/Toast';
import { useGlobalContext } from "../../hooks/useGlobalContext";

export function Home(){
  const { isDialogOpen, toast } = useGlobalContext();
  const overlayRef = useRef<HTMLDivElement | null>(null);

  return(
    <main>
      <Posts />

      <TransitionGroup>
        {isDialogOpen && (
          <CSSTransition
            in={isDialogOpen} 
            nodeRef={overlayRef}  
            timeout={500}
            unmountOnExit  
            classNames="dialog-fade" 
          >
            <PostDialog overlayRef={overlayRef} />
          </CSSTransition>
        )}
      </TransitionGroup>
      
      <Toast message={toast.message} />
    </main>
  )
}