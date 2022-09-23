
import { ThumbsUp, Trash } from 'phosphor-react';

import { useAuthContext } from '../../hooks/useAuthContext';
import { deleteCommentary } from '../../hooks/useFirebase';
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

  async function handleDeleteCommentary(){
    try{
      await deleteCommentary(id);
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
        <button type="button">
          <ThumbsUp />
          <span>Like・{String(likes).padStart(2, '0')}</span>
        </button>
      </CommentContent>
    </PostComment>
  )
}