import { ImgHTMLAttributes } from 'react';
import { UserAvatar, UserAvatarWithBorder } from './styles';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement>{
  imgUrl: string;
  hasBorder?: boolean;
}

export function Avatar({ imgUrl, hasBorder = false, ...rest }: AvatarProps){
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