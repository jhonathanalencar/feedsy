import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import bcryptjs from 'bcryptjs';
import { Eye, EyeSlash } from 'phosphor-react';
import { signInWithEmailAndPassword, deleteUser } from 'firebase/auth';

import { auth } from '../../services/firebase';
import { getUserByEmail } from '../../hooks/useFirebase';
import { useAuthContext } from '../../hooks/useAuthContext';
import { UserType } from '../../reducers/auth/types';

import { AlertMessage } from '../../components/AlertMessage';
import { Loading } from '../../components/Loading';

import {
  SigninContainer,
  Form,
  HeadingContainer,
  Label,
  Input,
  PasswordInputContainer,
  ShowPasswordButton,
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

interface FormAlert{
  type: 'error' | 'success';
  message: string;
}

export function SignIn(){
  const errorRef = useRef<HTMLSpanElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formAlert, setFormAlert] = useState({} as FormAlert);

  const { signInUser, rememberUserCredentials, user } = useAuthContext();

  const navigate = useNavigate();

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

      const foundUser = await getUserByEmail(email);

      if(!foundUser){
        setFormAlert({
          type: 'error',
          message: 'Invalid email or password',
        });
        return;
      }

      const isMatch = bcryptjs.compareSync(password, foundUser.password);

      if(isMatch){
        const response = await signInWithEmailAndPassword(auth, email, foundUser.password);

        setFormAlert({
          type: 'success',
          message: 'Sign In Successful'
        });

        const tempUser: UserType = {
          id: response.user.uid,
          email: foundUser.email,
          username: foundUser.username,
          createdAt: foundUser.createdAt,
        }

        signInUser(tempUser);

        rememberUserCredentials(remember);

        reset();
        navigate('/profile');
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
    if(user){
      navigate('/profile');
    }
    
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
            <PasswordInputContainer>
              <Input 
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="off"
                placeholder="Enter password"
                required
                disabled={isSubmitting}
                {...register('password')}
              />
              <ShowPasswordButton
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeSlash />
                ) : (
                  <Eye />
                )}
              </ShowPasswordButton>
            </PasswordInputContainer> 
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