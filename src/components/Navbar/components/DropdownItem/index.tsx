import { ReactNode } from "react";

import { Item } from './styles';

interface DropdownItemProps{
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  goToMenu?: string;
  href?: string;
  setActiveMenu?: (menu: string) => void;
}

export function DropdownItem({ leftIcon, rightIcon, children, goToMenu, setActiveMenu, href}: DropdownItemProps){
  return(
    <Item 
      to={href ?? '#'} 
      onClick={() => goToMenu && setActiveMenu && setActiveMenu(goToMenu)}
    >
      <span>
        {leftIcon && leftIcon}
      </span>

      {children}

      <span>
        {rightIcon && rightIcon}
      </span>
    </Item>
  )
}