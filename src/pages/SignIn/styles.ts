import styled from "styled-components";
import { lighten, shade } from 'polished';

export const SigninContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 100%;
  
  &::placeholder{
    color: ${({theme}) => theme['gray-500']};
  }
`;

export const PasswordInputContainer = styled.div`
  position: relative;
`;

export const ShowPasswordButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  display: inline-flex;
  background: transparent;
  border: none;
  cursor: pointer;

  svg{
    height: 1.5rem;
    width: 1.5rem;
    color: ${({theme}) => theme['purple-500']};
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
  position: relative;
  
  input, label{
    margin: 0;
  }
  
  input[type=checkbox]{
    width: 0.1rem;
    height: 0.1rem;
    opacity: 0;
  }

  label{
    font-size: 1rem;
    color: ${({theme}) => theme['gray-500']};
  }

  label::after{
    content: '';
    position: absolute;
    border: 0.2rem solid ${({theme}) => shade(0.1, theme['purple-500'])};
    border-radius: 50%;
    width: 0.75rem;
    height: 0.75rem;
    left: 0;
    cursor: pointer;
  }

  input[type=checkbox]:checked + label::after{
    background-color: ${({theme}) => lighten(0.1,theme['purple-500'])};
  }

  input[type=checkbox]:focus + label::after{
    outline: 0.2rem solid ${({theme}) => theme['blue-400']};
  }
`;

export const SigninButton = styled.button`
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

export const SignupText = styled.span`
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

