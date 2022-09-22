import { FormEvent, MouseEvent, RefObject, useEffect, useRef, useState } from 'react';
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
import { createNewPost } from '../../hooks/useFirebase';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Loading } from '../Loading';
import { AlertMessage } from '../AlertMessage';

interface PostDialogProps{
  overlayRef: RefObject<HTMLDivElement>
}

interface FormAlert{
  type: 'error' | 'success';
  message: string;
}

export function PostDialog({ overlayRef }: PostDialogProps){
  const { user } = useAuthContext();
  const { closeDialog } = useGlobalContext();

  const [postContent, setPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formAlert, setFormAlert] = useState({} as FormAlert);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const errorRef = useRef<HTMLSpanElement>(null);

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

  async function handleCreateNewPost(e: FormEvent){
    e.preventDefault();

    try{
      if(!user){ return; }
      
      setIsLoading(true);
      await createNewPost(user, postContent);
      setIsLoading(false);

      closeDialog();
    }catch(error: any){
      setIsLoading(false);
      
      setFormAlert({
        type: 'error',
        message: 'Something went wrong! Please try later.'
      })
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
          <Form onSubmit={handleCreateNewPost}>
            {formAlert.message && (
              <AlertMessage 
                alertRef={errorRef} 
                type={formAlert.type}
                message={formAlert.message}
              />
            )}

            <textarea 
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <PublishButton>
              {isLoading ? (
                <Loading />
                ) : (
                  'Publish'
                  )}
            </PublishButton>
          </Form>
        </DialogContent>
      </DialogOverlay>
    </DialogContainer>
  )
}