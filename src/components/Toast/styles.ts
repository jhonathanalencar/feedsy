import styled from 'styled-components';

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  .toast-animation-enter{
    transform: translateX(-100%);
  }
  .toast-animation-enter-active{
    transform: translateX(0);
    transition: transform .5s ease-in;
  }
  .toast-animation-exit{
    transform: translateX(0);
  }
  .toast-animation-exit-active{
    transform: translateX(-100%);
    transition: transform .5s ease-out;
  }
`;

export const ToastMessage = styled.div`
  background-color: ${({theme}) => theme['red-500']};
  color: ${({theme}) => theme['gray-200']};
  font-weight: bold;
  width: 15.625rem;
  text-align: center;
  margin-bottom: 1rem;
  margin-left: 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  overflow-wrap: break-word;

  @media (min-width: 34.375em){
    width: 18.75rem;
  }
`;
