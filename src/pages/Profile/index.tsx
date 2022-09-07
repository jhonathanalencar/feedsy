import { Clock, Envelope, User } from 'phosphor-react';
import {
  ProfileContainer,
  ProfileBackground,
  ProfileContent,
  ProfilePhoto,
  ProfileInfoContainer,
  ProfileInfo,
  ProfileButtons,
  DeleteButton,
  SignOutButton,
} from './styles';

export function Profile(){
  return(
    <ProfileContainer>
      <ProfileBackground>

      <ProfileContent>
        <ProfilePhoto>
          <img src="https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="propfile photo" />
        </ProfilePhoto>
        <ProfileInfoContainer>
          <ProfileInfo>
            <User />
            <strong>Alice</strong>
          </ProfileInfo>
          <ProfileInfo>
            <Envelope />
            <span>Alice@gmail.com</span>
          </ProfileInfo>
          <ProfileInfo>
            <Clock />
            <span>Joined on January 25, 2008</span>
          </ProfileInfo>
          <ProfileButtons>
            <DeleteButton>Delete</DeleteButton>
            <SignOutButton>Sign out</SignOutButton>
          </ProfileButtons>
        </ProfileInfoContainer>
      </ProfileContent>
      </ProfileBackground>
    </ProfileContainer>
  )
}