import styled from "styled-components";
import { lighten } from "polished";

export const UserAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;

  img{
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
  
export const UserAvatarWithBorder = styled(UserAvatar)`
  background: linear-gradient(90deg, ${(props) => props.theme['blue-400']}, ${(props) => props.theme['blue-600']});
  width: 3rem;
  height: 3rem;
  padding: 0.35rem;

  img{
    outline: 0.25rem solid ${(props) => lighten(0.05, props.theme['gray-600'])};
  }
`;

export const UserAvatarWithoutImage = styled(UserAvatar)`
  background: linear-gradient(135deg,
    ${({theme}) => theme['gray-500']},
    ${({theme}) => theme['gray-600']}
  );

  svg{
    width: 100%;
    height: 100%;
    color: ${({theme}) => theme['gray-100']};
  }
`;