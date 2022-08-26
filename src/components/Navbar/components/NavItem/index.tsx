import { ReactNode, useEffect, useState } from "react"

interface NavItemProps{
  icon: ReactNode;
  children?: ReactNode;
}

export function NavItem({ icon, children }: NavItemProps){
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
      <a href="#" onClick={() => setIsOpen((prevState) => !prevState)}>
        {icon}
      </a>
      {isOpen && children}
    </li>
  )
}