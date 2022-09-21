import { MouseEvent, RefObject, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { X } from 'phosphor-react';

import { useGlobalContext } from '../../hooks/useGlobalContext';

import { 
  DialogContainer, 
  DialogOverlay, 
  DialogContent,
  CloseButton,
  Form,
  PublishButton,
} from './styles';

interface PostDialogProps{
  overlayRef: RefObject<HTMLDivElement>
}

export function PostDialog({ overlayRef }: PostDialogProps){
  const { closeDialog, isDialogOpen } = useGlobalContext();

  const contentRef = useRef<HTMLDivElement | null>(null);

  function handleCloseDialogByClickingOnOverlay(e: MouseEvent){
    if(!contentRef.current){ return; }

    const element = e.target as HTMLElement;

    if(!contentRef.current.contains(element)){
      closeDialog();
    }
  }

  function handleCloseDialogByPressingEscape(e: KeyboardEvent){
    if(e.key === 'Escape'){
      closeDialog();
    }
  }

  useEffect(() =>{
    document.addEventListener('keydown', handleCloseDialogByPressingEscape);

    return () =>{
      document.removeEventListener('keydown', handleCloseDialogByPressingEscape);
    }
  }, []);

  return(
    <DialogContainer aria-labelledby="dialogTitle" aria-describedby="dialogDescription">
      <DialogOverlay 
        ref={overlayRef}
        onClick={handleCloseDialogByClickingOnOverlay}
      >
        <DialogContent ref={contentRef}>
          <CloseButton 
            aria-label="close" 
            title="Close"
            onClick={closeDialog}
          >
            <X weight="bold" />
          </CloseButton>
          <h1 id="dialogTitle">New Post</h1>
          <p id="dialogDescription">What do you want to talk about?</p>
          <Form>
            <textarea />
            <PublishButton>Publish</PublishButton>
          </Form>
        </DialogContent>
      </DialogOverlay>
    </DialogContainer>
  )
}