import { MouseEvent, RefObject, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { X } from 'phosphor-react';
import { useGlobalContext } from '../../hooks/useGlobalContext';

import { 
  ModalContainer, 
  ModalOverlay, 
  ModalContent,
  CloseButton,
  ButtonsContainer,
  CancelButton,
  DeleteButton,
} from './styles';

interface AlertModal{
  warning: string;
  description: string;
  handle: () => void;
  overlayRef: RefObject<HTMLDivElement>;
}

export function AlertModal({ warning, description, handle, overlayRef }: AlertModal){
  const { closeModal, isModalOpen } = useGlobalContext();
  const contentRef = useRef<HTMLDivElement | null>(null);
  
  function handleClick(){
    handle();
    closeModal();
  }

  function handleCloseModalByClickingOnOverlay(e: MouseEvent){
    if(!contentRef.current){ return; }

    const element = e.target as HTMLElement;

    if(!contentRef.current.contains(element)){
      closeModal();
    }
  }

  function handleCloseModalByPressingEscape(e: KeyboardEvent){
    if(e.key === 'Escape'){
      closeModal();
    }
  }

  useEffect(() =>{
    document.addEventListener('keydown', handleCloseModalByPressingEscape);

    return () => {
      document.removeEventListener('keydown', handleCloseModalByPressingEscape);
    }
  }, []);

  return(
    <ModalContainer aria-labelledby="modalTitle" aria-describedby="modalDescription">
      <ModalOverlay 
        ref={overlayRef} 
        onClick={(e) => handleCloseModalByClickingOnOverlay(e)}
      >
        <CSSTransition 
          in={isModalOpen} 
          nodeRef={contentRef}
          timeout={500} 
          unmountOnExit
          classNames="modal-scale"
        >
          <ModalContent ref={contentRef}>
            <CloseButton 
              aria-label="close" 
              title="Close"
              onClick={closeModal}
            >
              <X weight="bold" />
            </CloseButton>
            <h1 id="modalTitle">{warning}</h1>
            <p id="modalDescription">{description}</p>
            <ButtonsContainer>
              <CancelButton 
                type="button"
                onClick={closeModal}
              >
                Cancel
              </CancelButton>
              <DeleteButton 
                type="button"
                onClick={handleClick}
              >
                Delete
              </DeleteButton>
            </ButtonsContainer>
          </ModalContent>
        </CSSTransition>
      </ModalOverlay>
    </ModalContainer>
  )
}