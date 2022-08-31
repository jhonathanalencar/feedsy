import styled from "styled-components";
import { lighten, shade } from 'polished';

export const SigninContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;

  @media (max-width: 1000px){
    padding: 4rem 1rem;
  }
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
  margin-bottom: 0.5rem;

  span{
    font-size: 1rem;
    color: ${({theme}) => theme['gray-500']};
  }

  strong{
    font-size: 1.5rem;
    color: ${({theme}) => theme['gray-600']};
  }

  @media (max-width: 550px){
    strong{
      font-size: 1.25rem;
    }
  }
`;

export const Error = styled.span`
  width: 100%;
  background-color: ${(props) => props.theme['red-500']};
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem;
  margin-block: 0.5rem;

  @media (max-width: 550px){    
    font-size: 1rem;  
    padding: 0.25rem 0.5rem;
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
  background-color: ${({theme}) => theme['blue-500']};
  color: ${({theme}) => theme['gray-100']};
  border: 0.2rem solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all .3s ease;

  &:hover{
    background-color: ${({theme}) => lighten(0.1, theme['blue-500'])};
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

