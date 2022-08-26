import { Post } from '../Post';
import {
  PostsContainer,
  PostsWrapper,
} from './styles';

export function Posts(){
  return(
    <PostsContainer>
      <PostsWrapper>
        <Post />
        <Post />
        <Post />
        <Post />
      </PostsWrapper>
    </PostsContainer>
  )
}