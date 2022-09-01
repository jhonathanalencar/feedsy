import styled from "styled-components";

export const DropdownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  display: flex;
  padding: 0.5rem;
  width: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  
  &:hover{
    background-color: ${(props) => props.theme['gray-600']};
    filter: brightness(1.1);
  }

  svg{
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`;

export const DropdownLi = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 50%;
  text-align: center;
  
  a{
    display: flex;
    padding: 0.5rem;
    width: 3rem;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    
    &:hover{
      background-color: ${(props) => props.theme['gray-600']};
      filter: brightness(1.1);
    }

    svg{
      font-size: 1.5rem;
      color: ${(props) => props.theme['gray-100']};
    }
  }
`;