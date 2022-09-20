import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "../services/firebase";

import { UserType } from "../reducers/auth/types";

export async function checkDuplicatedUsername(username: string){
  let isDuplicatedUsername = false;

  const querySnapshot = await getDocs(collection(db, "users"));

  querySnapshot.forEach((doc) => {
    if(doc.data().username.toLowerCase() === username.toLowerCase()){
      isDuplicatedUsername = true;
    }
  });

  return isDuplicatedUsername;
}

export async function createNewUser(username: string, email: string, password: string){
  const response = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", response.user.uid), {
    username,
    password,
    email,
    createdAt: serverTimestamp(),
  });
}

type User = {
  username: string;
  email: string;
  password: string;
  createdAt: Timestamp;
}

export async function getUserByEmail(email: string){
  const querySnapshot = await getDocs(collection(db, "users"));

  const foundUser = querySnapshot.docs.find((doc) =>{
    if(doc.data().email === email){
      return {
        id: doc.id,
        ...doc.data()
      }
    }
  });

  return foundUser?.data() as User;
}

export async function uploadFileToStorage(
  user: UserType,
  fileName: string, 
  file: File, 
  changeUploadState: (state: boolean) => void,
  changeUploadProgress: (progress: number) => void
){
  const storageRef = ref(storage, `images/${fileName}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed',
    (snapshot) =>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      changeUploadProgress(progress);
      changeUploadState(true);
    },
    (error) =>{
      console.log(error);
    },
    () =>{
      getDownloadURL(uploadTask.snapshot.ref)
        .then(async (downloadURL) =>{
          if(user && user.id){ 
            const userRef = doc(db, "users", user.id);

            if(user.userAvatar){
              const oldProfilePictureRef = ref(storage, user.userAvatar);
              await deleteObject(oldProfilePictureRef);
            }
  
            await updateDoc(userRef, {
              userAvatar: downloadURL,
            });

            changeUploadState(false);
          }
        })
        .catch((error: any) =>{
          console.log(error.code);
          console.log(error.message);
        })
    }
  );
}
 
          