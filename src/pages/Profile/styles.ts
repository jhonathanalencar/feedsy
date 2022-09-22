import styled from 'styled-components';
import { lighten } from 'polished';

export const ProfileContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-inline: 1rem;
`;

export const ProfileBackground = styled.div`
  background: linear-gradient(45deg, ${({theme}) => theme['blue-600']}, ${({theme}) => theme['green-500']});
  padding-top: 1rem;
  padding-bottom: 0.25rem;
  border-radius: 0.5rem;
`;

export const ProfileContent = styled.div`
  background-color: ${({theme}) => theme['gray-700']};
  border-radius: 0.25rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;

  @media (max-width: 550px){
    flex-direction: column;
    padding: 2rem 1rem;
  }
`;

export const MessageErrorContainer = styled.div`
  position: absolute;
  content: '';
  width: 100%;
  top: -2rem;
  left: 0;
  display: flex;
`;

export const ProfilePhoto = styled.div<{isUploading: boolean}>`
  height: 8rem;
  width: 8rem;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 0.2rem solid ${({theme}) => theme['green-300']};
  
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${({isUploading}) => isUploading ? 0.6 : 1};
    animation: fadeIn 1s ease-in;
  }

  label{
    cursor: ${({isUploading}) => isUploading ? 'not-allowed' : 'pointer'};

    &:hover{
      background-color: ${(props) => 
        props.isUploading 
          ? props.theme['gray-700'] 
          : lighten(0.015, props.theme['gray-600'])
      };
    }
  }

  @keyframes fadeIn{
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
`;

export const FileLabel = styled.label`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  color: ${({theme}) => theme['gray-200']};
  transition: background-color .3s ease;
  
  svg{
    height: 1.75rem;
    width: 1.75rem;
  }

  span{
    font-size: 1rem;
    width: min-content;
    text-align: center;
    color: ${({theme}) => theme['gray-300']};
  }
`;

export const FileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const LoadingContainer = styled.div`
  position: absolute;
`;

export const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;

  svg{
    font-size: 1.25rem;
    color: ${({theme}) => theme['blue-300']};

    @media (max-width: 550px){
      font-size: 1rem;
    }
  }

  strong{
    color: ${({theme}) => theme['gray-200']};
  }
  span{
    color: ${({theme}) => theme['gray-300']};
  }
`;

export const ProfileButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1rem;
  border-top: 0.1rem solid ${({theme}) => theme['gray-500']};
  padding-top: 1.5rem;
  margin-top: 1rem;

  @media (max-width: 550px){
    padding-top: 1rem;
    margin-top: 0.5rem;
  }
`;

const Button = styled.button`
  padding: 0.25rem 1rem;
  font-size: 1rem;
  text-transform: uppercase;
  border-radius: 0.25rem;
  font-weight: bold;
  border: none;
  color: ${({theme}) => theme['gray-100']};
  letter-spacing: 0.05rem;
  transition: opacity 0.3s linear;
  flex: 1;

  &:not(:disabled):hover{
    opacity: 1;
  }

  @media (max-width: 550px){
    padding: 0.25rem 0.75rem;
  }
`;

export const DeleteButton = styled(Button)<{isLoading: boolean}>`
  align-self: stretch;

  background-color: ${({theme}) => theme['red-500']};
  opacity: ${({isLoading}) => isLoading ? 0.6 : 0.8};
  cursor: ${({isLoading}) => isLoading ? 'not-allowed' : 'pointer'};
`;

export const SignOutButton = styled(Button)<{isLoading: boolean}>`
  background-color: ${({theme}) => theme['yellow-500']};
  opacity: ${({isLoading}) => isLoading ? 0.6 : 0.8};
  cursor: ${({isLoading}) => isLoading ? 'not-allowed' : 'pointer'};
`;