import { CircleNotch } from 'phosphor-react';

import { LoadingContainer } from './styles';

export function Loading(){
  return(
    <LoadingContainer>
      <CircleNotch size={26} weight="bold" />
    </LoadingContainer>
  )
}