import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import bcryptjs from 'bcryptjs';

import {
  SigninContainer,
  Form,
  HeadingContainer,
  Label,
  Input,
  CheckboxContainer,
  SigninButton,
  SignupText,
} from './styles';
import { getUserByEmail } from '../../hooks/useFirebase';
import { AlertMessage } from '../../components/AlertMessage';
import { Loading } from '../../components/Loading';
import { useAuthContext } from '../../hooks/useAuthContext';

const signinFormValidationSchema = zod.object({
  email: zod.string().email().trim(),
  password: zod.string().trim(),
  remember: zod.boolean()
});

type SigninFormData = zod.infer<typeof signinFormValidationSchema>

interface FormAlert{
  type: 'error' | 'success';
  message: string;
}

export function SignIn(){
  const errorRef = useRef<HTMLSpanElement>(null);
  const [formAlert, setFormAlert] = useState({} as FormAlert);

  const { signInUser, rememberUserCredentials  } = useAuthContext();

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

  async function onSubmit(data: SigninFormData){
    try{
      const { email, password, remember } = data;

      const foundUserPassword = await getUserByEmail(email);

      if(!foundUserPassword){
        setFormAlert({
          type: 'error',
          message: 'Invalid email or password',
        });
        return;
      }

      const isMatch = bcryptjs.compareSync(password, foundUserPassword);

      if(isMatch){
        const response = await signInWithEmailAndPassword(auth, email, foundUserPassword);

        setFormAlert({
          type: 'success',
          message: 'Sign In Successful'
        });

        signInUser(response.user);

        rememberUserCredentials(remember);

        reset();
      }else{
        setFormAlert({
          type: 'error',
          message: 'Invalid email or password',
        });
        return;
      }
    }catch(error: any){
      if(error.code === 'auth/too-many-requests'){
        setFormAlert({
          type: 'error',
          message: 'Too many requests. Please try again later.'
        });
      }else if(error.code === 'auth/wrong-password'){
        setFormAlert({
          type: 'error',
          message: 'Invalid email or password',
        });
      }
    }
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
            {formAlert.message && (
              <AlertMessage 
                alertRef={errorRef}
                type={formAlert.type}
                message={formAlert.message}
                aria-live="assertive"
              />
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
              {isSubmitting ? (
                <Loading />
              ) : (
                'Sign in'
              )}
            </SigninButton>
            <SignupText>Don't have an account? <Link to="/signup">Sign up now</Link></SignupText>
        </Form>
      </FormProvider>
    </SigninContainer>
  )
}