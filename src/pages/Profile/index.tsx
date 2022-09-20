import { useState, useEffect, useRef } from 'react';
import { Clock, Envelope, FileImage, User } from 'phosphor-react';
import { collection, onSnapshot, Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';

import { AlertMessage } from '../../components/AlertMessage';
import { Loading } from '../../components/Loading';

import { db } from '../../services/firebase';
import { uploadFileToStorage } from '../../hooks/useFirebase';
import { useAuthContext } from '../../hooks/useAuthContext';


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
  const { user, updateUser } = useAuthContext();
  const [alert, setAlert] = useState({} as Alert);
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const errorRef = useRef<HTMLSpanElement | null>(null);

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
              <DeleteButton>Delete</DeleteButton>
              <SignOutButton>Sign out</SignOutButton>
            </ProfileButtons>
          </ProfileInfoContainer>
        </ProfileContent>
      </ProfileBackground>
    </ProfileContainer>
  )
}