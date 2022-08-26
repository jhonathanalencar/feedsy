import { Trash, ThumbsUp } from 'phosphor-react';
import { formatDistanceToNow } from 'date-fns';

import { Avatar } from '../Avatar';
import { Comment } from '../Comment';

import {
  PostContainer,
  PostInfo,
  PostComments,
  CommentContainer,
  CommentForm,
} from './styles';

export function Post(){
  function formatDate(date: Date){
    return formatDistanceToNow(date, { addSuffix: true });
  }

  return(
    <PostContainer>
      <PostInfo>
        <header>
          <Avatar imgUrl="https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" hasBorder={true} />
          <strong>Alice</strong>
          <span>・</span>
          <time>{formatDate(new Date('08/08/2022'))}</time>
        </header>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat earum doloribus aut perferendis iusto illum! Quam praesentium autem quis et?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat earum doloribus aut perferendis iusto illum! Quam praesentium autem quis et?</p>
      </PostInfo>
      <CommentContainer>
        <strong>Leave a comment</strong>
        <div>
          <CommentForm>
            <textarea />
            <button type="submit">Publish</button>
          </CommentForm>
          <PostComments>
            <Comment />
            <Comment />
          </PostComments>
        </div>
      </CommentContainer>
    </PostContainer>
  )
}