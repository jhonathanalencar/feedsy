import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { DropdownItem } from '../DropdownItem';

import { 
  ArrowLeft, 
  CaretRight, 
  GearSix, 
  User, 
  SignOut,
  Trash, 
  House
} from 'phosphor-react';

import { 
  DropdownMenuContainer,
  Dropdown,
} from './styles';

export function DropdownMenu(){
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState<number | null>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  function calculateHeight(element: HTMLElement){
    const height = element.offsetHeight;
    setMenuHeight(height);
  }

  useEffect(() =>{
    if(dropdownMenuRef.current){
      const div = dropdownMenuRef.current.firstChild as HTMLElement;
      setMenuHeight(div.offsetHeight);
    }
  }, []);

  return(
    <DropdownMenuContainer style={{ height: menuHeight ?? '' }} ref={dropdownMenuRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calculateHeight}
      >
        <Dropdown>
          <DropdownItem 
            leftIcon={<House />}
            href="/"
          >
            <span>Home</span>
          </DropdownItem>
          <DropdownItem 
            leftIcon={<User />}
            href="profile"
          >
            <span>My Profile</span>
          </DropdownItem>
          <DropdownItem
            leftIcon={<GearSix />}
            rightIcon={<CaretRight />}
            goToMenu="settings"
            setActiveMenu={setActiveMenu}
          >
            <span>Settings</span>
          </DropdownItem>
        </Dropdown>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calculateHeight}
      >
        <Dropdown className="menu">
          <DropdownItem 
            leftIcon={<ArrowLeft />} 
            goToMenu="main"
            setActiveMenu={setActiveMenu}
          >
            <strong>Account Settings</strong>
          </DropdownItem>
          <DropdownItem 
            leftIcon={<SignOut />}
          >
            <span>Sign Out</span>
          </DropdownItem>
          <DropdownItem 
            leftIcon={<Trash />}
          >
            <span>Delete Account</span>
          </DropdownItem>
        </Dropdown>
      </CSSTransition>
    </DropdownMenuContainer>
  )
}