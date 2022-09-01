import { Link } from "phosphor-react";
import { ReactNode } from "react";
import { useGlobalContext } from "../../../../hooks/useGlobalContext";

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
  const { closeDropdownMenu } = useGlobalContext();

  return(
    <>
      {goToMenu ? (
        <Item 
          to={href ?? '#'} 
          onClick={() => setActiveMenu && setActiveMenu(goToMenu)}
        >
          <span>
            {leftIcon && leftIcon}
          </span>

          {children}

          <span>
            {rightIcon && rightIcon}
          </span>
        </Item>
      ) : (
        <Item 
          to={href ?? '#'} 
          onClick={closeDropdownMenu}
        >
          <span>
            {leftIcon && leftIcon}
          </span>

          {children}

          <span>
            <Link />
          </span>
        </Item>
      )}
    </>
  )
}