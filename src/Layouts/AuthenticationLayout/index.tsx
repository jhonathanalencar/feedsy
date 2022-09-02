import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutContainer,
  FormContainer,
  LayoutHeader,
} from './styles';

export function AuthenticationLayout(){
  const location = useLocation();

  const { pathname } = location;

  const path = pathname.substring(pathname.indexOf('/'), pathname.length);
  console.log(path);

  return(
    <LayoutContainer>
      <FormContainer>
        <LayoutHeader>
          <Link 
            to="/signin"
            className={path === '/signin' ? 'active' : ''}
          >
            Sign in
          </Link>
          <Link 
            to="/signup"
            className={path === '/signup' ? 'active' : ''}
          >
            Sign up
          </Link>
        </LayoutHeader>
        <Outlet />
      </FormContainer>
    </LayoutContainer>
  )
}