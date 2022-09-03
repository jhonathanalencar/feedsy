import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

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


const signupFormValidationSchema = zod.object({
  username: zod
    .string().trim()
    .min(3, 'Username must be at least 3 characters.')
    .max(23, 'Username must be at most 23 characters.')
    .regex(/^[A-z]/, 'Username must begin with a letter'),
  email: zod
    .string().trim()
    .email('Must be a valid email'),
  password: zod
    .string().trim()
    .min(8, 'Password must be at least 8 characters.')
    .max(24, 'Password must be at most 24 characters.')
    .regex(passwordRegex, 'Must include uppercase and lowercase letters, a number and a special character.'),
  confirmPassword: 
    zod.string().trim()
}).refine((data) => data.password === data.confirmPassword, { message: "Passwords don't match", path: ['confirmPassword'] });

type SignupFormData = zod.infer<typeof signupFormValidationSchema>

export function SignUp(){
  const errorRef = useRef<HTMLSpanElement>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupFormValidationSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'all'
  });

  const { 
    handleSubmit, 
    watch, 
    reset, 
    register, formState: { errors, isSubmitting }, 
    setFocus,
  } = signupForm;

  function onSubmit(data: SignupFormData){
    console.log(data)

    reset();
  }

  const isEmptyFields = !watch().username || !watch().email || !watch().password || !watch().confirmPassword;

  function handleValidation(){
    if(errors.username){
      setFocus('username', { shouldSelect: true });
    }else if(errors.email){
      setFocus('email', { shouldSelect: true });
    }else if(errors.password){
      setFocus('password', { shouldSelect: true })
    }else if(errors.confirmPassword){
      setFocus('confirmPassword', { shouldSelect: true });
    }
  }

  useEffect(() =>{
    setFocus('username');
  }, []);

  return(
    <SignupContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...signupForm}>
          <HeadingContainer>
            <span>Register</span>
            <strong>Sign up for Feedsy</strong>
          </HeadingContainer>
          {errorMessage && (
            <Error ref={errorRef} aria-live="assertive">
              {errorMessage}
            </Error>
          )}
          <Label htmlFor="username">
            Username:
          </Label>
          <Input 
            type="text" 
            id="username"
            placeholder="Enter username"
            autoComplete="off"
            required
            disabled={isSubmitting}
            aria-invalid={errors.username ? true : false}
            aria-describedby="usernamenote"
            {...register('username')}
          />
          {errors.username && (
            <ErrorDescription id="usernamenote" aria-live="assertive">
              <span role="alert">{errors.username.message}</span>
            </ErrorDescription>
          )}

          <Label htmlFor="email">
            Email:
          </Label>
          <Input 
            type="email" 
            id="email"
            placeholder="Enter email"
            autoComplete="off"
            required
            disabled={isSubmitting}
            aria-invalid={errors.email ? true : false}
            aria-describedby="emailnote"
            {...register('email')}
          />
          {errors.email && (
            <ErrorDescription id="emailnote" aria-live="assertive">
              <span role="alert">{errors.email.message}</span>
            </ErrorDescription>
          )}

          <Label htmlFor="password">
            Password:
          </Label>
          <Input 
            type="password" 
            id="password"
            placeholder="Enter password"
            autoComplete="off"
            required
            disabled={isSubmitting}
            aria-invalid={errors.password ? true : false}
            aria-describedby="passwordnote"
            {...register('password')}
          />

          {errors.password && (
            <ErrorDescription id="passwordnote" aria-live="assertive">
              <span role="alert">{errors.password.message}</span>
            </ErrorDescription>
          )}

          <Label htmlFor="confirmPassword">
            Confirm Passoword:
          </Label>
          <Input 
            type="password" 
            id="confirmPassword"
            placeholder="Enter password"
            autoComplete="off"
            required
            disabled={isSubmitting}
            aria-invalid={errors.confirmPassword ? true : false}
            aria-describedby="confirmnote"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <ErrorDescription id="confirmnote" aria-live="assertive">
              <span>{errors.confirmPassword.message}</span>
            </ErrorDescription>
          )}
          
          <SignupButton disabled={isEmptyFields} onClick={handleValidation}>
            Sign up
          </SignupButton>
          <Text>Already have an account? <Link to="/signin">Sign in</Link></Text>
        </FormProvider>
      </Form>
    </SignupContainer>
  )
}