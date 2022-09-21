import { Link, Outlet } from 'react-router-dom';
import { CaretDown, Plus, Users } from "phosphor-react";

import { Navbar } from "../../components/Navbar";
import { DropdownMenu } from "../../components/Navbar/components/DropdownMenu";
import { NavItem } from "../../components/Navbar/components/NavItem";

import {
  LayoutContainer,
  HeaderContainer,
  HeaderWrapper,
  Logo,
  FooterContainer
} from './styles';
import { useAuthContext } from '../../hooks/useAuthContext';

export function DefaultLayout(){
  const { user } = useAuthContext();

  return(
    <LayoutContainer>
      <HeaderContainer>
        <HeaderWrapper>
          <Logo>
            <Link to="/">
              <strong>Feed<span>sy</span></strong>
            </Link>
          </Logo>
          <Navbar>
            {!user ? (
              <NavItem icon={<Users />} link="/signin" />
            ) : (
              <>
                <NavItem icon={<Plus />} />
                <NavItem icon={<CaretDown />}>
                  <DropdownMenu />
                </NavItem>
              </>
            )}
          </Navbar>
        </HeaderWrapper>
      </HeaderContainer>
      <Outlet />
      <FooterContainer>
        <span>Coded by Jhonathan。</span>
      </FooterContainer>
    </LayoutContainer>
  )
}