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
import { useGlobalContext } from '../../../../hooks/useGlobalContext';

export function DropdownMenu(){
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState<number | null>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const { closeDropdownMenu } = useGlobalContext();

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

   function closeDropdownOnClickOutside(e: MouseEvent){
    if(!dropdownMenuRef.current){ return; }
    const element = e.target as HTMLElement
    if(element.parentElement?.className === 'sc-jSMfEi hFjvjs' || element.className === 'sc-jSMfEi hFjvjs'){
      return;
    }
    if(!dropdownMenuRef.current.contains(element)){
      closeDropdownMenu();
    }
  }

  useEffect(() =>{
    window.addEventListener('click', closeDropdownOnClickOutside);

    return () => {
      window.removeEventListener('click', closeDropdownOnClickOutside);
    }
  }, [])

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