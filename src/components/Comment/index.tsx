
import { ThumbsUp, Trash } from 'phosphor-react';

import { useAuthContext } from '../../hooks/useAuthContext';
import { addLikeOnCommentary, deleteCommentary } from '../../hooks/useFirebase';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import { formatTimestampToDate } from '../../utils/formatTimestampToDate';

import { Avatar } from '../Avatar';
import { CommentaryType } from '../Post';

import { PostComment, CommentContent, CommentInfo } from './styles';

export function Comment({
  id,
  authorAvatar,
  authorName,
  commentary,
  createdBy,
  publishedAt,
  commentedOn,
  likes,
}: CommentaryType){
  const { user } = useAuthContext();
  const { openToast } = useGlobalContext();

  let isLiked: boolean = false;

  if(user){
    isLiked = likes.includes(user.id);
  }

  async function handleDeleteCommentary(){
    try{
      await deleteCommentary(id);
    }catch(error: any){
      openToast('The operation could not be completed');
    }
  }

  async function handleAddLikeOnCommentary(){
    if(!user){ return; }
    try{
      await addLikeOnCommentary(user, id);
    }catch(error: any){
      openToast('The operation could not be completed');
    }
  }

  return(
    <PostComment>
      <Avatar imgUrl={authorAvatar ?? ''} />
      <CommentContent>
        <CommentInfo>
          <header>
            <div>
              {createdBy === user?.id ? (
                <strong>{authorName} <span>(you)</span></strong>
              ) : (
                <strong>{authorName}</strong>
              )}
              <time>{formatTimestampToDate(publishedAt)}</time>
            </div>
            {createdBy === user?.id && (
              <button 
                type="button"
                title="delete"
                aria-label="delete"
                onClick={handleDeleteCommentary}
              >
                <Trash />
              </button>
            )}
          </header>
          <p>{commentary}</p>
        </CommentInfo>
        <button 
          type="button"
          onClick={handleAddLikeOnCommentary}
          className={isLiked ? 'active' : ''}
        >
          <ThumbsUp />
          <span>Like・{String(likes.length).padStart(2, '0')}</span>
        </button>
      </CommentContent>
    </PostComment>
  )
}