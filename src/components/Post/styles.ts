import styled from "styled-components";
import { lighten } from 'polished';

export const PostContainer = styled.article`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background-color: ${(props) => lighten(0.05, props.theme['gray-600'])};
  border-radius: 0.5rem;
  box-shadow: 0.25rem 0.25rem 1rem rgba(0, 0, 0, 0.2);
`; 

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  header{
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: ${(props) => props.theme['gray-100']};
    margin-bottom: 1rem;

    @media (min-width: 550px){
      font-size: 1rem;
    }

    strong{
      margin-left: 0.5rem;
    }

    span{
      color: ${(props) => props.theme['gray-300']};
      font-weight: bold;
      font-size: 1rem;
      padding-top: 0.5rem;

      @media (min-width: 550px){
        font-size: 1.5rem;
      }
    }

    time{
      font-size: 0.875rem;
      color: ${(props) => props.theme['gray-400']};

      @media (min-width: 550px){
        font-size: 1rem;
      }
    }
  }

  p{
    color: ${(props) => props.theme['gray-200']};
    font-size: 0.875rem;
    line-height: 1.5;

    @media (min-width: 550px){
      font-size: 1rem;
    }
  }
`;

export const CommentContainer = styled.div`
  width: 100%;
  border-top: 0.1rem solid ${(props) => props.theme['gray-300']};

  strong{
    display: block;
    margin-block: 1rem;
    color: ${(props) => props.theme['gray-100']};
  }
`;

export const CommentForm = styled.form`
  flex: 1;
  margin-bottom: 2rem;
  
  textarea{
    width: 100%;
    height: 5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
    border: none;
    padding: 0.5rem;
    font-size: 1rem;
    resize: none;

    @media (min-width: 550px){
      height: 7rem;
    }

    &::-webkit-scrollbar-thumb{
      background-color: ${(props) => props.theme['blue-600']};
      border-radius: 0.5rem;
    }

    &::-webkit-scrollbar{
      width: 0.3rem;
      border-radius: 0.5rem;
      background-color: #2b2b2b;
      margin: 1rem 0;
    }

    &:focus-within{
      ~ button{
        display: block;
      }
    }
  }

  button{
    display: none;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    background-color: ${(props) => props.theme['blue-500']};
    border: none;
    border-radius: 0.25rem;
    color: ${(props) => props.theme['gray-100']};
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover{
      background-color: ${(props) => props.theme['blue-400']};
    }
  }
`;

export const PostComments = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding-block: 1rem;
`;


