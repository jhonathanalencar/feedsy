import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

const signinFormValidationSchema = zod.object({
  email: zod.string().email().trim(),
  password: zod.string().trim(),
  remember: zod.boolean()
});

type SigninFormData = zod.infer<typeof signinFormValidationSchema>

export function SignIn(){
  const errorRef = useRef<HTMLSpanElement>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const signinForm = useForm<SigninFormData>({ 
    resolver: zodResolver(signinFormValidationSchema), 
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    }
  });
  
  const { 
    handleSubmit,
    register, 
    watch, 
    setFocus,
    reset,
    formState: { isSubmitting } 
  } = signinForm;

  const isEmptyFields = !watch().email || !watch().password;

  function onSubmit(data: SigninFormData){
    console.log(data);
    reset();
  }

  useEffect(() =>{
    setFocus('email');
  }, []);

  return(
    <SigninContainer>
      <FormProvider {...signinForm} >
        <Form onSubmit={handleSubmit(onSubmit)}>
            <HeadingContainer>
              <span>Welcome back</span>
              <strong>Sign In to your account</strong>
            </HeadingContainer>
            {errorMessage && (
              <Error ref={errorRef} aria-live="assertive">{errorMessage}</Error>
            )}
            <Label htmlFor="username">
              Email
            </Label>
            <Input 
              type="email"
              id="username" 
              placeholder="Enter email"
              autoComplete="off"
              required
              disabled={isSubmitting}
              {...register('email')}
            />
    
            <Label htmlFor="password">
              Password
            </Label>
            <Input 
              type="password"
              id="password"
              autoComplete="off"
              placeholder="Enter password"
              required
              disabled={isSubmitting}
              {...register('password')}
            />
            <CheckboxContainer>
              <Input 
                type="checkbox" 
                id="remember" 
                disabled={isSubmitting}
                {...register('remember')}
              />
              <Label htmlFor="remember">Remember password</Label>
            </CheckboxContainer>
  
            <SigninButton
              disabled={isEmptyFields || isSubmitting}
            >
              Sign in
            </SigninButton>
            <SignupText>Don't have an account? <Link to="/signup">Sign up now</Link></SignupText>
        </Form>
      </FormProvider>
    </SigninContainer>
  )
}