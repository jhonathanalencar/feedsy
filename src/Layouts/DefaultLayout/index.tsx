import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Bell, CaretDown, Plus, Users } from "phosphor-react";

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

export function DefaultLayout(){
  return(
    <LayoutContainer>
      <HeaderContainer>
        <HeaderWrapper>
          <Logo>
            <strong>Feed<span>sy</span></strong>
          </Logo>
          <Navbar>
            <NavItem icon={<Plus />} />
            <NavItem icon={<Users />} link="/signin" />
            <NavItem icon={<CaretDown />}>
              <DropdownMenu />
            </NavItem>
          </Navbar>
        </HeaderWrapper>
      </HeaderContainer>
      <Outlet />
      <FooterContainer>
        <span>Made by Jhonathan。</span>
      </FooterContainer>
    </LayoutContainer>
  )
}