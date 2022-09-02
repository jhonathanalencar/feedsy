import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { 
  SignupContainer,
  Form,
  HeadingContainer,
  Error,
  ErrorDescription,
  Label,
  Input,
  SignupButton,
  Text,
} from './styles';

export function SignUp(){
  const usernameRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isEmptyFields = !username || !email || !confirmPassword || !password;

  useEffect(() =>{
    if(!usernameRef.current){ return; }

    usernameRef.current.focus();
  }, [])

  return(
    <SignupContainer>
      <Form>
        <HeadingContainer>
          <span>Register</span>
          <strong>Sign up for Feedsy</strong>
        </HeadingContainer>
        <Error>
          error
        </Error>
        <Label htmlFor="username">
          Username:
        </Label>
        <Input 
          type="text" 
          id="username"
          ref={usernameRef}  
          placeholder="Enter username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          aria-invalid={true}
          aria-describedby="usernamenote"
          aria-live="assertive"
        />
        <ErrorDescription id="usernmenote">
          <span>Username must has 3 characters</span>
        </ErrorDescription>
        <Label htmlFor="email">
          Email:
        </Label>
        <Input 
          type="email" 
          id="email"
          placeholder="Enter email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={true}
          aria-describedby="emailnote"
          aria-live="assertive"
        />
        <ErrorDescription>
          <span>Email must be valid</span>
        </ErrorDescription>
        <Label htmlFor="password">
          Password:
        </Label>
        <Input 
          type="password" 
          id="password"
          placeholder="Enter password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-invalid={true}
          aria-describedby="passwordnote"
          aria-live="assertive"
        />
        <ErrorDescription id="passwordnote">
          <span>Password must have 8 characteres</span>
        </ErrorDescription>
        <Label htmlFor="confirmPassword">
          Confirm Passoword:
        </Label>
        <Input 
          type="password" 
          id="confirmPassword"
          placeholder="Enter password"
          autoComplete="off"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          aria-invalid={true}
          aria-describedby="confirmnote"
          aria-live="assertive"
        />
        <ErrorDescription id="confirmnote">
          <span>Password must be equals</span>
        </ErrorDescription>
        <SignupButton disabled={isEmptyFields}>
          Sign up
        </SignupButton>
        <Text>Already have an account? <Link to="/signin">Sign in</Link></Text>
      </Form>
    </SignupContainer>
  )
}