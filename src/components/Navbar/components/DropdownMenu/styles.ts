import styled from "styled-components";

export const DropdownMenuContainer = styled.div`
  position: absolute;
  top: 4rem;
  width: 18rem;
  transform: translateX(-90%);
  background-color: ${(props) => props.theme['gray-800']};
  border-radius: 0.25rem;
  overflow: hidden;
  transition: height .3s ease;  

  @media (max-width: 600px){
    right: 0;
    transform: translateX(0);

  }

  @media (max-width: 360px){
    width: 100%;
  }

  /* CSSTransition classes  */
  .menu-primary-enter {
    position: absolute;
    transform: translateX(-110%);
  }
  .menu-primary-enter-active {
    transform: translateX(0%);
    transition: all .3s ease;
  }
  .menu-primary-exit {
    position: absolute;
  }
  .menu-primary-exit-active {
    transform: translateX(-110%);
    transition: all .3s ease;
  }

  .menu-secondary-enter {
    transform: translateX(110%);
  }
  .menu-secondary-enter-active {
    transform: translateX(0%);
    transition: all .3s ease;
  }
  .menu-secondary-exit {
  }
  .menu-secondary-exit-active {
    transform: translateX(110%);
    transition: all .3s ease;
  }
`;

export const Dropdown = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 0.25rem;
  transition: background 0.3s;
  filter: none;
  padding: 1rem;
`;