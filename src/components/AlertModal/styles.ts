import styled from "styled-components";
import { darken } from "polished";

export const ModalContainer = styled.div`
  position: absolute;
  inset: 0;
`;

export const ModalOverlay = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);

  /* CSSTransition classes  */
  .modal-scale-enter {
    transform: scale(0);
  }
  .modal-scale-enter-active {
    transform: scale(1);
    transition: transform .5s ease-in;
  }
  .modal-scale-exit {
    transform: scale(1);
  }
  .modal-scale-exit-active {
    transform: scale(0);
    transition: transform .5s ease-out;
  }
`;

export const ModalContent = styled.div`
  width: min(550px, calc(100% - 1rem * 2));
  margin-inline: auto;
  background-color: ${({theme}) => theme['gray-600']};
  padding: 1rem 1rem 2rem;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  box-shadow: 0.125rem 0.125rem 2rem ${({theme}) => theme['gray-700']};
  animation: scale 0.5s ease-in;

  @keyframes scale{
    0%{
      transform: scale(0);
    }
    100%{
      transform: scale(1);
    }
  }

  h1{
    color: ${({theme}) => theme['gray-200']};
  }

  p{
    color: ${({theme}) => theme['gray-400']};
    text-align: center;
  }
`;

export const CloseButton = styled.button`
  align-self: flex-end;
  display: inline-flex;
  border: transparent;
  background-color: transparent;
  cursor: pointer;
  
  svg{
    color: ${({theme}) => theme['red-500']};
    height: 1.5rem;
    width: 1.5rem;
    transition: color 0.3s ease;

    &:hover{
      color: ${({theme}) => theme['red-400']};
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  text-transform: capitalize;
  padding: 0.5rem 1rem; 
  font-weight: bold;
  color: ${({theme}) => theme['gray-600']};
  cursor: pointer;
  border: transparent;
  background-color: transparent;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
  box-shadow: 0.1rem 0.1rem 1rem ${({theme}) => theme['gray-700']};
`;

export const CancelButton = styled(Button)`
  background-color: ${({theme}) => theme['gray-100']};

  &:is(:hover, :focus){
    background-color: ${({theme}) => darken(0.2, theme['gray-100'])};
  }
`;

export const DeleteButton = styled(Button)`
  background-color: ${({theme}) => theme['red-500']};
  color: ${({theme}) => theme['gray-100']};

  &:is(:hover, :focus){
    background-color: ${({theme}) => darken(0.1, theme['red-500'])};
  }
`;
