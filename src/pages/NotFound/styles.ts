import styled from "styled-components";

export const NotFoundContainer = styled.main`
  flex: 1;
`;

export const NotFoundContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  svg{
    font-size: 8rem;
  }

  strong{
    font-size: 3.5rem;
    text-transform: capitalize;
  }

  p{
    font-size: 1.25rem;
  }

  @media (max-width: 550px){
    svg{
      font-size: 6rem;
    }

    strong{
      font-size: 2rem;
      text-align: center;
    }

    p{
      font-size: 1rem;
      text-align: center;
    }
  }
`;

export const NotFoundButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-direction: row;


  @media (max-width: 550px){
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  text-transform: capitalize;
  font-weight: bold;
  color: ${({theme}) => theme['gray-200']};
  opacity: 0.8;
  transition: opacity 0.3s ease;
  cursor: pointer;

  &:hover{
    opacity: 1;
  }
`;

export const HomeButton = styled(Button)`
  background-color: ${({theme}) => theme['blue-500']};
`;

export const PreviousPageButton = styled(Button)`
  background-color: ${({theme}) => theme['green-300']};
`;