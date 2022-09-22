import { formatDistanceToNow } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { TrashSimple } from 'phosphor-react';
import { useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useAuthContext } from '../../hooks/useAuthContext';
import { deletePost } from '../../hooks/useFirebase';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import { AlertModal } from '../AlertModal';

import { Avatar } from '../Avatar';
import { Comment } from '../Comment';

import { PostType } from '../Posts';

import {
  PostContainer,
  PostInfo,
  PostComments,
  CommentContainer,
  CommentForm,
} from './styles';

export function Post({ 
  id, 
  authorName, 
  authorAvatar, 
  publishedAt, 
  content, 
  createdBy 
}: PostType){
  const { user } = useAuthContext();
  const { openModal, isModalOpen, closeModal } = useGlobalContext();

  const overlayRef = useRef<HTMLDivElement | null>(null);

  function formatDate(timestamp: Timestamp){
    const date = timestamp;

    if(!date){return;}

    const formattedDate = publishedAt.toDate();

    return formatDistanceToNow(formattedDate, { addSuffix: true });
  }

  async function handleDeletePost(){
    try{
      await deletePost(id);
      
      closeModal();
    }catch(error: any){
      console.log(error.code)
      console.log(error.message)
    }
  }
 
  return(
    <PostContainer>
      <PostInfo>
        <header>
          <Avatar imgUrl={authorAvatar ?? ''} hasBorder={true} />
            {createdBy === user?.id ? (
              <strong>{authorName} <span>(you)</span></strong>
            ) : (
              <strong>{authorName}</strong>
            )}
          <span>・</span>
          <time>{formatDate(publishedAt)}</time>
          {createdBy === user?.id && (
            <button
              type="button"
              title="delete"
              aria-label="delete"
              onClick={openModal}
            >
              <TrashSimple weight="fill" />
            </button>
          )}
        </header>
        <p>{content}</p>
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
      <TransitionGroup>
        {isModalOpen && (
          <CSSTransition 
            in={isModalOpen} 
            nodeRef={overlayRef}
            timeout={500} 
            unmountOnExit
            classNames="modal-fade"
          >
            <AlertModal
              overlayRef={overlayRef}
              warning="Delete post"
              description='Are you sure you want to delete this post?'
              handle={handleDeletePost}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </PostContainer>
  )
}