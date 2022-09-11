import { SmileySad } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

import {
  NotFoundContainer,
  NotFoundContent,
  NotFoundButtons,
  HomeButton,
  PreviousPageButton,
} from './styles';

export function NotFound(){
  const navigate = useNavigate();

  return(
    <NotFoundContainer>
      <NotFoundContent>
        <SmileySad />
        <strong>404 | Page Not Found</strong>
        <p>The page you are looking for could not be found!</p>
        <NotFoundButtons>
          <HomeButton type="button" onClick={() => navigate('/')}>Go to home</HomeButton>
          <PreviousPageButton type="button" onClick={() => navigate(-1)}>Go back to previous page</PreviousPageButton>
        </NotFoundButtons>
      </NotFoundContent>
    </NotFoundContainer>
  )
}