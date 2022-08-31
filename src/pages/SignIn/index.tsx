import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  SigninContainer,
  Form,
  HeadingContainer,
  Error,
  Label,
  Input,
  CheckboxContainer,
  SigninButton,
  SignupText,
} from './styles';

export function SignIn(){
  const emailRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLSpanElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('This is an error');
  const [isChecked, setIsChecked] = useState(false);

  const isEmptyFields = !email || !password

  useEffect(() =>{
    emailRef?.current?.focus();
  }, []);

  useEffect(() =>{
    console.log(isChecked);
  }, [isChecked]);

  return(
    <SigninContainer>
      <Form>
        <HeadingContainer>
          <span>Welcome back</span>
          <strong>Sign In to your account</strong>
        </HeadingContainer>
        <Error ref={errorRef} aria-live="assertive">{errorMessage}</Error>
        <Label htmlFor="username">
          Email:
        </Label>
        <Input 
          type="email"
          id="username" 
          ref={emailRef}
          placeholder="Enter email"
          autoComplete="off"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label htmlFor="password">
          Password:
        </Label>
        <Input 
          type="password"
          id="password"
          autoComplete="off"
          placeholder="Enter password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <CheckboxContainer>
          <Input 
            type="checkbox" 
            id="remember" 
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <Label htmlFor="remember">Remember password</Label>
        </CheckboxContainer>
        <SigninButton
          disabled={isEmptyFields}
        >
          Sign in
        </SigninButton>
        <SignupText>Don't have an account? <Link to="/signup">Sign up now</Link></SignupText>
      </Form>
    </SigninContainer>
  )
}