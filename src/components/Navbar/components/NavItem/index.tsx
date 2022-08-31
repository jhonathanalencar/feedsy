import { ReactNode, useEffect, useState } from "react";
import { Link } from 'react-router-dom';

interface NavItemProps{
  icon: ReactNode;
  children?: ReactNode;
  link?: string;
}

export function NavItem({ icon, children, link }: NavItemProps){
  const [isOpen, setIsOpen] = useState(false);
  
  function handleCloseDropdownMenu(e: KeyboardEvent){
    if(e.key === 'Escape'){
      setIsOpen(false);
    }
  }

  useEffect(() =>{
    document.addEventListener('keydown', handleCloseDropdownMenu);

    return () => document.removeEventListener('keydown', handleCloseDropdownMenu);
  }, [])

  return(
    <li>
      <Link to={link ?? '#'} onClick={() => setIsOpen((prevState) => !prevState)}>
        {icon}
      </Link>
      {isOpen && children}
    </li>
  )
}