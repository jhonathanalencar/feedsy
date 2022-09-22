
import { Timestamp } from 'firebase/firestore';
import { ThumbsUp, Trash } from 'phosphor-react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { formatTimestampToDate } from '../../utils/formatTimestampToDate';

import { Avatar } from '../Avatar';
import { CommentaryType } from '../Post';

import { PostComment, CommentContent, CommentInfo } from './styles';

interface CommentProps{
  id: string;
  authorAvatar: string;
  authorName: string;
  comment: string;
  createdBy: string;
  commentedOn: string;
  publishedAt: Timestamp;
  likes: number;
}

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
            <button type="button">
              <Trash />
            </button>
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