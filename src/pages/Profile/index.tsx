import { useState, useEffect, useRef } from 'react';
import { Clock, Envelope, FileImage, User } from 'phosphor-react';
import { collection, onSnapshot, Timestamp } from 'firebase/firestore';
import { deleteUser, signInWithEmailAndPassword } from 'firebase/auth';
import { format } from 'date-fns';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { AlertMessage } from '../../components/AlertMessage';
import { AlertModal } from '../../components/AlertModal';
import { Loading } from '../../components/Loading';

import { auth, db } from '../../services/firebase';
import { deleteFromFirebase, getUserByEmail, signOutUserFromFirebase, uploadFileToStorage } from '../../hooks/useFirebase';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useGlobalContext } from '../../hooks/useGlobalContext';

import {
  ProfileContainer,
  ProfileBackground,
  ProfileContent,
  MessageErrorContainer,
  ProfilePhoto,
  FileLabel,
  FileInput,
  LoadingContainer,
  ProfileInfoContainer,
  ProfileInfo,
  ProfileButtons,
  DeleteButton,
  SignOutButton,
} from './styles';

interface Alert{
  type: 'error' | 'success';
  message: string;
}

export function Profile(){
  const { user, updateUser, signOutUser } = useAuthContext();
  const { isModalOpen, openModal, closeModal } = useGlobalContext();

  const [alert, setAlert] = useState({} as Alert);
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const errorRef = useRef<HTMLSpanElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  let formattedDate: Date | null = null;

  if(user && user.createdAt){
    formattedDate = new Timestamp(user.createdAt.seconds, user.createdAt.nanoseconds).toDate();
  }

  const acceptedFormatsRegex =
    /(?:([^:/?#]+):)?(?:([^/?#]*))?([^?#](?:jpeg|gif|png))(?:\?([^#]*))?(?:#(.*))?/g;

  function changeUploadState(isUploading: boolean){
    setIsUploading(isUploading);
  }

  function changeUploadProgress(progress: number){
    setUploadProgress(progress);
  }

  async function handleUploadPictureFile(){
    if(!pictureFile){ return; }

    const isMatch = acceptedFormatsRegex.test(pictureFile.type);

    if(!isMatch){
      setAlert({
        type: 'error',
        message: 'You can only upload jpeg and png files'
      });

      return;
    }

    if(pictureFile.size > 10000000 ){
      setAlert({
        type: 'error',
        message: 'Files must be less than 10 MB'
      });

      return;
    }

    const fileName = String(new Date().getTime()) + ':' + pictureFile.name;

    if(!user){return};

    await uploadFileToStorage(
      user, 
      fileName, 
      pictureFile,
      changeUploadState,
      changeUploadProgress,
    );
  }

  async function handleSignOut(){
    try{
      await signOutUserFromFirebase();

      signOutUser();
    }catch(error: any){
      console.log(error.code);
      console.log(error.message);
    }
  }

  async function handleDeleteUser(){
    try{
      if(!user){ return; }

      setIsLoading(true);

      const tempUser = await getUserByEmail(user.email);

      const userCredentials = await signInWithEmailAndPassword(auth, tempUser.email, tempUser.password);

      await deleteFromFirebase(userCredentials.user.uid);
      await deleteUser(userCredentials.user);

      signOutUser();
      setIsLoading(false);
      closeModal();
    }catch(error: any){
      console.log(error.code);
      console.log(error.message);
    }
  }

  useEffect(() =>{
    handleUploadPictureFile();
  }, [pictureFile]);

  useEffect(() =>{
    const unsubscribe = onSnapshot(
      collection(db, "users"), (snapshot) =>{
        if(user && user.id){
          const foundUser = snapshot.docs.map((doc) =>{
            if(doc.id === user.id){
              return doc.data();
            }
          }).filter(Boolean);

          if(foundUser && foundUser[0]){
            const tempUser = {
              ...user,
              userAvatar: foundUser[0].userAvatar
            }

            updateUser(tempUser);
          }
        }
      },
      (error) =>{
        console.log(error);
      }
    );

    return () =>{
      unsubscribe();
    }
  }, []);
  
  return(
    <ProfileContainer>
      <ProfileBackground>
        <ProfileContent>
          <MessageErrorContainer>
            {alert.message && (
              <AlertMessage 
                alertRef={errorRef}
                type={alert.type}
                message={alert.message}
                aria-live="assertive"
              />
            )}
          </MessageErrorContainer>
          <ProfilePhoto isUploading={isUploading}>
            <FileLabel htmlFor="picture">
              {user?.userAvatar ? (
                <>
                <img src={user.userAvatar} alt="profile photo" /> 
                {isUploading && (
                  <LoadingContainer>
                    <Loading />
                  </LoadingContainer>
                )}
                </>
              ) : (
                <>
                  <FileImage />   
                  <span>Upload image</span>         
                </>
              )}
            </FileLabel>
            <FileInput 
              id="picture" 
              type="file" 
              onChange={(e) => e.target.files && setPictureFile(e.target.files[0])}
              disabled={uploadProgress !== null && uploadProgress < 100}
            />
          </ProfilePhoto>
          <ProfileInfoContainer>
            <ProfileInfo>
              <User />
              <strong>{user?.username}</strong>
            </ProfileInfo>
            <ProfileInfo>
              <Envelope />
              <span>{user?.email}</span>
            </ProfileInfo>
            <ProfileInfo>
              {formattedDate && (
                <>
                  <Clock />
                  <span>Joined {format(formattedDate, 'MMMM dd, yyyy')}</span>
                </>
              )} 
            </ProfileInfo>
            <ProfileButtons>
              <DeleteButton
                type="button"
                onClick={openModal}
                isLoading={isLoading}
                disabled={isLoading || isUploading}
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  'Delete'
                )}
              </DeleteButton>
              <SignOutButton
                type="button"
                onClick={handleSignOut}
                isLoading={isLoading}
                disabled={isLoading || isUploading}
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  'Sign out'
                )}
              </SignOutButton>
            </ProfileButtons>
          </ProfileInfoContainer>
        </ProfileContent>
      </ProfileBackground>
          <TransitionGroup>
            {isModalOpen && (
              <CSSTransition 
                in={isModalOpen} 
                nodeRef={modalRef}
                timeout={500} 
                unmountOnExit
                classNames="modal-fade"
              >
                <AlertModal 
                  overlayRef={modalRef}
                  warning="Delete account"
                  description="Are you sure you want to permanently delete your account?"
                  handle={handleDeleteUser}
                />
              </CSSTransition>
            )}
          </TransitionGroup>
    </ProfileContainer>
  )
}