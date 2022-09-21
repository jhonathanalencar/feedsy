import styled from "styled-components";
import { lighten } from 'polished';

export const DialogContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 9999;
`;

export const DialogOverlay = styled.div`
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DialogContent = styled.div`
  background-color: ${({theme}) => theme['gray-600']};
  padding: 2rem;
  border-radius: 0.25rem;
  box-shadow: 0.15rem 0.15rem 0.75rem ${({theme}) => theme['gray-800']};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: min(800px, 100% - 1rem * 2);

  h1{
    color: ${({theme}) => theme['gray-200']};
  }

  p{
    color: ${({theme}) => theme['gray-300']};
  }
`;

export const CloseButton = styled.button`
  display: inline-flex;
  align-self: flex-end;
  border: transparent;
  background: transparent;
  cursor: pointer;
  
  svg{
    color: ${({theme}) => theme['red-500']};
    height: 1.75rem;
    width: 1.75rem;
    transition: color 0.3s ease;
  }

  &:is(:hover, :focus){
    svg{
      color: ${({theme}) => theme['red-400']};
    }
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 0.1rem solid ${({theme}) => theme['gray-300']};
  margin-top: 1rem;
  padding-top: 1rem;

  textarea{
    border-radius: 0.25rem;
    border: none;
    resize: vertical;
    height: 8rem;
    min-height: 5rem;
    max-height: 15rem;
    padding: 0.5rem;

    &::-webkit-scrollbar{
      width: 0.5rem;
    }

    &::-webkit-scrollbar-track{
      background-color: ${({theme}) => lighten(0.1, theme['gray-600'])};
      border-radius: 100vw;
      margin-block: 0.25rem;
    }

    &::-webkit-scrollbar-thumb{
      background-color: ${({theme}) => lighten(0.2, theme['gray-600'])};
      border: 0.15rem solid ${({theme}) => lighten(0.1, theme['gray-600'])};
      border-radius: 100vw;
    }
  }
`;

export const PublishButton = styled.button`
  align-self: flex-start;
  border: transparent;
  background-color: ${({theme}) => theme['blue-600']};
  color: ${({theme}) => theme['gray-100']};
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color .3s ease;

  &:hover{
    background-color: ${({theme}) => lighten(0.1, theme['blue-600'])};
  }
`;