import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import bcryptjs from 'bcryptjs';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { 
  serverTimestamp, 
  setDoc, 
  doc,
  collection,
  getDocs,
} from 'firebase/firestore';

import { auth, db } from '../../services/firebase';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

import { 
  SignupContainer,
  Form,
  HeadingContainer,
  ErrorDescription,
  Label,
  Input,
  SignupButton,
  Text,
} from './styles';
import { AlertMessage } from '../../components/AlertMessage';
import { Loading } from '../../components/Loading';

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

type FormAlert = {
  type: 'success' | 'error';
  message: string;
}

export function SignUp(){
  const alertRef = useRef<HTMLSpanElement>(null);
  const [formAlert, setFormAlert] = useState({} as FormAlert);

  const navigate = useNavigate();

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

  async function onSubmit(data: SignupFormData){
    try{
      const { username, email, password } = data;

      let isDuplicatedUsername = false;

      const querySnapshot = await getDocs(collection(db, "users"));

      querySnapshot.forEach((doc) => {
        if(doc.data().username.toLowerCase() === username.toLowerCase()){
            isDuplicatedUsername = true;
          }
      });

      if(isDuplicatedUsername){
        setFormAlert({
          type: 'error',
          message: 'That username has been taken. Please choose another.'
        });

        return;
      }

      const hashedPassword = bcryptjs.hashSync(password, 10);

      const response = await createUserWithEmailAndPassword(auth, data.email, hashedPassword);

      await setDoc(doc(db, "users", response.user.uid), {
        username,
        password: hashedPassword,
        email,
        createdAt: serverTimestamp(),
      });

      reset();
      setFormAlert({
        type: 'success',
        message: 'Registration successful'
      });

      navigate('/signin');
    }catch(error: any){
      if(error.code === 'auth/email-already-in-use'){
        setFormAlert({
          type: 'error',
          message: 'That email has been taken. Please choose another.'
        });
      }else{
        setFormAlert({
          type: 'error',
          message: 'Something went wrong. Please try later.'
        });
      }
    }
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
          {formAlert.message && (
            <AlertMessage 
              alertRef={alertRef}
              aria-live="assertive"
              type={formAlert.type}
              message={formAlert.message}
            />
          )}
          <Label htmlFor="username">
            Username
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
            Email
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
            Password
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
            Confirm Passoword
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
          
          <SignupButton disabled={isEmptyFields || isSubmitting} onClick={handleValidation}>
            {isSubmitting ? (
              <Loading />
            ) : (
              'Sign up'
            )}
          </SignupButton>
          <Text>Already have an account? <Link to="/signin">Sign in</Link></Text>
        </FormProvider>
      </Form>
    </SignupContainer>
  )
}