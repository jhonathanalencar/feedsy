import styled from "styled-components";
import { shade, lighten } from 'polished';

export const LayoutContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;

  @media (max-width: 1000px){
    padding: 4rem 1rem;
  }
`;

export const FormContainer = styled.div`
  background-color: ${({theme}) => shade(0.1, theme['gray-600'])};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.25rem;
  box-shadow: 0.5rem 0.5rem 2rem ${({theme}) => theme['gray-800']};
`;

export const LayoutHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  max-width: 600px;
  margin: 0 auto;

  a{
    color: ${({theme}) => theme['gray-200']};
    text-decoration: none;
    font-size: 1.125rem;
    font-weight: bold;
    padding: 1rem 2rem;
    transition: background-color 0.3s ease;

    &:hover{
      background-color: ${({theme}) => lighten(0.05, theme['gray-600'])};
    }
  }

  .active {
    color: ${({theme}) => theme['gray-100']};
    background-color: ${({theme}) => lighten(0.05, theme['gray-600'])};
  }
`;