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
  House,
  CircleWavyWarning,
  LightningSlash,
} from 'phosphor-react';

import { 
  DropdownMenuContainer,
  Dropdown,
} from './styles';
import { useGlobalContext } from '../../../../hooks/useGlobalContext';
import { useCloseOnClickOutside } from '../../../../hooks/useCloseOnClickOutside';
import { useEventListener } from '../../../../hooks/useEventListener';

export function DropdownMenu(){
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState<number | null>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const transitionOneRef = useRef<any>(null);
  const transitionTwoRef = useRef<any>(null);

  const { closeDropdownMenu, dropdownButtonRef } = useGlobalContext();

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
    useCloseOnClickOutside<HTMLDivElement>(e, dropdownMenuRef, dropdownButtonRef, closeDropdownMenu);
  }

  useEventListener('mousedown', closeDropdownOnClickOutside);

  return(
    <DropdownMenuContainer style={{ height: menuHeight ?? '' }} ref={dropdownMenuRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        nodeRef={transitionOneRef}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calculateHeight}
      >
        <Dropdown className='menu' ref={transitionOneRef}>
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
        nodeRef={transitionTwoRef}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calculateHeight}
      >
        <Dropdown className="menu" ref={transitionTwoRef}>
          <DropdownItem 
            leftIcon={<ArrowLeft />} 
            goToMenu="main"
            setActiveMenu={setActiveMenu}
          >
            <strong>Account Settings</strong>
          </DropdownItem>
          <DropdownItem 
            leftIcon={<SignOut />}
            rightIcon={<LightningSlash />}
            href="profile"
          >
            <span>Sign Out</span>
          </DropdownItem>
          <DropdownItem 
            leftIcon={<Trash />}
            rightIcon={<CircleWavyWarning />}
            href="profile"
          >
            <span>Delete Account</span>
          </DropdownItem>
        </Dropdown>
      </CSSTransition>
    </DropdownMenuContainer>
  )
}