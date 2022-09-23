import { useEffect, useRef, useState } from 'react';
import { collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';

import { db } from '../../services/firebase';

import { Post } from '../Post';

import {
  PostsContainer,
  PostsWrapper,
  EmptyListText,
} from './styles';
import { LoadingPost } from '../Shimmer/LoadingPost';

export type PostType = {
  id: string;
  authorAvatar: string;
  authorName: string;
  content: string;
  publishedAt: Timestamp;
  createdBy: string;
}

export function Posts(){
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{
    const postsQuery = query(collection(db, "posts"), orderBy("publishedAt", "desc"));

    const unsubscribe = onSnapshot(
      postsQuery,
      (snapshot) =>{
        const data = snapshot.docs.map((doc) =>{
          return {
            id: doc.id,
            ...doc.data()
          }
        });

        const formattedData = data as PostType[];

        setPosts(formattedData);
        setIsLoading(false);
      },
      (error) =>{
        console.log(error.code);
        console.log(error.message);
      }
    );

    return () =>{
      unsubscribe();
    }
  }, []);

  return(
    <>
      {isLoading ? (
        <PostsContainer>
          <LoadingPost />
          <LoadingPost />
        </PostsContainer>
      ) : (
        <PostsContainer>
          {posts.length === 0 ? (
            <EmptyListText>No posts found</EmptyListText>
          ) : (
            <PostsWrapper>
              {posts.map((post) =>{
                return(
                  <Post 
                    key={post.id}
                    {...post}
                  />
                )
              })}
            </PostsWrapper>
          )}
        </PostsContainer>
      )}
    </>
  )
}