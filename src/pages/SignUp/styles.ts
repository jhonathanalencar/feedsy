import styled from "styled-components";
import { lighten } from 'polished';

export const SignupContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 600px;
  background-color: ${(props) => props.theme['white']};
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0.5rem 0.5rem 2rem ${({theme}) => theme['gray-900']};
  
  @media (max-width: 1000px){
    width: 100%;
  }

  @media (max-width: 550px){
    padding: 2rem 1rem;
  }
`;

export const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;

  span{
    font-size: 1rem;
    color: ${({theme}) => theme['gray-500']};
  }

  strong{
    font-size: 1.5rem;
    color: ${({theme}) => theme['gray-500']};
  }

  @media (max-width: 550px){
    strong{
      font-size: 1.25rem;
    }
  }
`;

export const ErrorDescription = styled.p`
  margin-bottom: 1rem;
  border-left: 0.1rem solid ${({theme}) => theme['red-400']};
  padding-left: 0.5rem;

  span{
    font-size: 1rem;
    color: ${({theme}) => theme['red-400']};
  }
`;

export const Label = styled.label`
  color: ${({theme}) => theme['gray-600']};
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 0.25rem;

  @media (max-width: 550px){
      font-size: 1rem;
  }
`;

export const Input = styled.input`
  height: 2.5rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
  font-size: 1rem;
  border: 0.2rem solid ${({theme}) => theme['purple-500']};
  
  &::placeholder{
    color: ${({theme}) => theme['gray-500']};
  }
`;

export const SignupButton = styled.button`
  padding: 0.75rem 0;
  font-size: 1.1rem;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.1rem;
  background-color: ${({theme}) => theme['purple-500']};
  color: ${({theme}) => theme['gray-100']};
  border: 0.2rem solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all .3s ease;

  &:not(:disabled):hover{
    background-color: ${({theme}) => lighten(0.1, theme['purple-400'])};
  }

  &:disabled{
    opacity: 0.8;
    cursor: not-allowed;
  }

  @media (max-width: 550px){
    font-size: 1rem;
    padding: 0.5rem 0;
  }
`;

export const Text = styled.span`
  margin-top: 1rem;
  text-align: center;
  font-size: 1rem;
  color: ${({theme}) => theme['gray-300']};
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  
  a{
    text-decoration: none;
    color: ${({theme}) => theme['purple-500']};
    font-weight: bold;

    &:hover{
      text-decoration: underline;
    }
  }
`;

