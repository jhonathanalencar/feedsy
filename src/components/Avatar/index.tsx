import { ImgHTMLAttributes } from 'react';
import { UserAvatar, UserAvatarWithBorder, UserAvatarWithoutImage } from './styles';
import { UserCircle } from 'phosphor-react'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement>{
  imgUrl: string;
  hasBorder?: boolean;
}

export function Avatar({ imgUrl, hasBorder = false, ...rest }: AvatarProps){
  if(!imgUrl){
    return(
      <UserAvatarWithoutImage>
        <UserCircle weight="regular" />
      </UserAvatarWithoutImage>
    )
  }

  return(
    <>
      {hasBorder ? (
        <UserAvatarWithBorder>
          <img src={imgUrl} alt="user avatar" {...rest} />
        </UserAvatarWithBorder>  
      ) : (
        <UserAvatar>
          <img src={imgUrl} alt="user avatar" {...rest} />
        </UserAvatar> 
      )}
    </>
  )
}