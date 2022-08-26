
import { ThumbsUp, Trash } from 'phosphor-react';

import { Avatar } from '../Avatar';

import { PostComment, CommentContent, CommentInfo } from './styles';

export function Comment(){
  return(
    <PostComment>
      <Avatar imgUrl="https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
      <CommentContent>
        <CommentInfo>
          <header>
            <div>
              <strong>Alice<span> (you)</span></strong>
              <time>{new Date().toISOString()}</time>
            </div>
            <button type="button">
              <Trash />
            </button>
          </header>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque commodi ducimus nulla soluta distinctio veniam incidunt nobis quia molestiae rerum.</p>
        </CommentInfo>
        <button type="button">
          <ThumbsUp />
          <span>Like・03</span>
        </button>
      </CommentContent>
    </PostComment>
  )
}