import Skeleton from "../../Skeleton";
import { LoadingCommentary } from "../LoadingCommentary";

import { Container } from './styles';

export function LoadingPost(){
  return(
    <Container>
      <div>
        <header>
          <Skeleton className="avatar-skeleton" />
          <Skeleton className="row-skeleton" />
          <Skeleton className="icon-skeleton" />
        </header>
        <hr />
        <Skeleton className="square-skeleton" />
        <LoadingCommentary />
        <LoadingCommentary />
      </div>
    </Container>
  )
}