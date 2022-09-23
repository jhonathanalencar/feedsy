import Skeleton from "../../Skeleton";

import { Container } from './styles';

export function LoadingCommentary(){
  return(
    <Container>
      <div>
        <Skeleton className="avatar-skeleton" />
        <div>
          <header>
            <Skeleton className="row-skeleton" />
              
            <Skeleton className="icon-skeleton" />
          </header>
          <Skeleton className="row-skeleton" />
        </div>
      </div>
    </Container>
  )
}