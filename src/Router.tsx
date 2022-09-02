import { Routes, Route } from 'react-router-dom';
import { AuthenticationLayout } from './Layouts/AuthenticationLayout';
import { DefaultLayout } from './Layouts/DefaultLayout';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Profile } from './pages/Profile';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

export function Router(){
  return(
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route element={<AuthenticationLayout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route> 
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}