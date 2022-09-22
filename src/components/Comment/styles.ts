import styled from "styled-components";
import { shade } from "polished";

export const PostComment = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;

  img{
    flex: 1;
    width: 2.5rem;
  }

  @media (max-width: 450px){
    flex-direction: column;
    gap: 0rem;
    
    img{
      border-radius: 0.25rem;
    }
  }
`;

export const CommentContent = styled.div`
  width: 100%;
  border-radius: 0.25rem;
  padding: 1rem;
  background-color: ${(props) => shade(0.5, props.theme['gray-500'])};

  button{
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${(props) => props.theme['gray-300']};
    cursor: pointer;
    border-radius: 0.25rem;
    transition: .3s ease;

    &:hover{
      color: ${(props) => props.theme['gray-200']};
    }

    svg{
      font-size: 1.3rem;
    }
  }
`;

export const CommentInfo = styled.div`
  margin-bottom: 1rem;

  header{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1rem;

    strong{
      margin: 0;
      margin-bottom: 0.25rem;

      span{
        color: ${(props) => props.theme['gray-300']};
      }
    }

    button{
      background: none;
      border: none;
      cursor: pointer;
      
      svg{
        font-size: 1.4rem;
        color: ${(props) => props.theme['red-500']};
        transition: 0.3s ease;

        &:hover{
          color: ${(props) => props.theme['red-300']};
        }
      }
    }
  }

  p{
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${(props) => props.theme['gray-200']};

    @media (min-width: 550px){
      font-size: 1rem;
    }
  }
`;