import { X } from 'phosphor-react';
import { 
  DialogContainer, 
  DialogOverlay, 
  DialogContent,
  CloseButton,
  Form,
  PublishButton,
} from './styles';

export function PostDialog(){
  return(
    <DialogContainer aria-labelledby="dialogTitle" aria-describedby="dialogDescription">
      <DialogOverlay>
        <DialogContent>
          <CloseButton 
            aria-label="close" 
            title="Close"
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