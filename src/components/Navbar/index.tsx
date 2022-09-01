import { ReactNode } from "react";

import {
  Nav,
  NavbarItems
} from './styles';

interface NavbarProps{
  children: ReactNode;
}

export function Navbar({ children }: NavbarProps){
  return(
    <Nav>
      <NavbarItems id="menu-dropdown">
        {children}
      </NavbarItems>
    </Nav>
  )
}