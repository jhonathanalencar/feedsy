import { ReactNode, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../../../../hooks/useGlobalContext";

import { DropdownButton, DropdownLi } from './styles';

interface NavItemProps{
  icon: ReactNode;
  children?: ReactNode;
  link?: string;
  handle?: () => void;
}

export function NavItem({ icon, children, link, handle }: NavItemProps){

  const { isDropdownMenuOpen, toggleDropdownMenu, closeDropdownMenu, dropdownButtonRef } = useGlobalContext();
  
  function handleCloseDropdownMenu(e: KeyboardEvent){
    if(e.key === 'Escape'){
      closeDropdownMenu();
    }
  }

  useEffect(() =>{
    if(!children){ return;}

    document.addEventListener('keydown', handleCloseDropdownMenu);

    return () => {
      document.removeEventListener('keydown', handleCloseDropdownMenu);
    }
  }, [])

  return(
    <>
      {children ? (
        <DropdownLi ref={dropdownButtonRef}>
          <DropdownButton 
            type="button" 
            onClick={toggleDropdownMenu}
            aria-expanded={isDropdownMenuOpen}
            aria-controls="menu-dropdown"
          >
            {icon}
          </DropdownButton>
          {isDropdownMenuOpen && children}
        </DropdownLi>
      ) : (
        <DropdownLi onClick={handle}>
          <Link to={link ?? '#'}>
            {icon}
          </Link>
        </DropdownLi>
      )}
    </>
  )
}