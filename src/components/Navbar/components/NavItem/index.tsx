import { ReactNode, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../../../../hooks/useGlobalContext";

import { DropdownButton, DropdownLi } from './styles';

interface NavItemProps{
  icon: ReactNode;
  children?: ReactNode;
  link?: string;
}

export function NavItem({ icon, children, link }: NavItemProps){
  const { isDropdownMenuOpen, toggleDropdownMenu, closeDropdownMenu } = useGlobalContext();
  
  function handleCloseDropdownMenu(e: KeyboardEvent){
    if(e.key === 'Escape'){
      closeDropdownMenu();
    }
  }

  useEffect(() =>{
    document.addEventListener('keydown', handleCloseDropdownMenu);

    return () => document.removeEventListener('keydown', handleCloseDropdownMenu);
  }, [])

  return(
    <>
      {children ? (
        <DropdownLi>
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
        <DropdownLi>
          <Link to={link ?? '#'}>
            {icon}
          </Link>
        </DropdownLi>
      )}
    </>
  )
}