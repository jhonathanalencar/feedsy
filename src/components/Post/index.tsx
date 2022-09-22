import { collection, onSnapshot, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { TrashSimple } from 'phosphor-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useAuthContext } from '../../hooks/useAuthContext';
import { createCommentary, deletePost } from '../../hooks/useFirebase';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import { db } from '../../services/firebase';
import { formatTimestampToDate } from '../../utils/formatTimestampToDate';
import { AlertMessage } from '../AlertMessage';
import { AlertModal } from '../AlertModal';

import { Avatar } from '../Avatar';
import { Comment } from '../Comment';

import { PostType } from '../Posts';

import {
  PostContainer,
  PostInfo,
  PostComments,
  CommentContainer,
  ErrorContainer,
  CommentForm,
} from './styles';

interface Alert{
  type: 'error' | 'success';
  message: string;
}

export type CommentaryType = {
  id: string;
  authorAvatar: string;
  authorName: string;
  commentary: string;
  createdBy: string;
  commentedOn: string;
  publishedAt: Timestamp;
  likes: number;
}

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

  const [commentary, setCommentary] = useState('');
  const [commentaries, setCommentaries] = useState<CommentaryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({} as Alert);

  const alertRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  async function handleDeletePost(){
    try{
      await deletePost(id);
      
      closeModal();
    }catch(error: any){
      console.log(error.code)
      console.log(error.message)
    }
  }

  async function handleCreateCommentary(e: FormEvent){
    e.preventDefault();

    try{
      if(!user){ return; }
      
      setIsLoading(true);

      await createCommentary(user, commentary, id);
    }catch(error: any){
      setAlert({
        type: 'error',
        message: 'Something went wrong! Please try later.'
      });
    }finally{
      setIsLoading(false);
      setCommentary('');
    }
  }

  useEffect(() =>{
    const timeout = setTimeout(() =>{
      setAlert({
        type: 'error',
        message: '',
      });
    }, 3000);

    return () =>{
      clearTimeout(timeout);
    }
  }, [alert]);

  useEffect(() =>{
    const commentariesQuery = query(collection(db, "commentaries"), where("commentedOn", "==", id));

    const unsubscribe = onSnapshot(
      commentariesQuery,
      (snapshot) =>{
        const data = snapshot.docs.map((doc) =>{
          return{
            id: doc.id,
            ...doc.data()
          }
        });

        const formattedData = data as CommentaryType[];

        setCommentaries(formattedData);
      },
      (error) =>{
        console.log(error.code);
      }
    );

    return () =>{
      unsubscribe();
    }
  }, []);
 
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
          <time>{formatTimestampToDate(publishedAt)}</time>
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
          {alert.message && (
            <ErrorContainer>
              <AlertMessage 
                alertRef={alertRef}
                type={alert.type}
                message={alert.message}
              />
            </ErrorContainer>
          )}
          <CommentForm onSubmit={handleCreateCommentary}>
            <textarea 
              value={commentary}
              onChange={(e) => setCommentary(e.target.value)}
              disabled={isLoading}
            />

            <button 
              type="submit"
              disabled={isLoading}
            >
              Publish
            </button>
          </CommentForm>
          <PostComments>
            {commentaries.map((commentary) =>{
              return(
                <Comment 
                  key={commentary.id}
                  {...commentary}
                />
              )
            })}
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