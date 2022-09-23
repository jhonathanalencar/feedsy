import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "../services/firebase";

import { UserType } from "../reducers/auth/types";
import { CommentaryType } from "../components/Post";

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

export async function signOutUserFromFirebase(){
  await signOut(auth);
}

export async function deleteFromFirebase(userId: string){
  const userRef = doc(db, "users", userId);
  const userDocument = await getDoc(userRef);
  
  await deleteDoc(userRef);

  const userData = userDocument.data() as UserType;

  if(userData.userAvatar){
    const profilePictureRef = ref(storage, userData.userAvatar);
    await deleteObject(profilePictureRef);
  }
}

export async function createNewPost(user: UserType, content: string){
  const publishedAt = serverTimestamp();

  await addDoc(collection(db, "posts"), {
    authorAvatar: user.userAvatar ? user.userAvatar : '',
    authorName: user.username,
    content,
    createdBy: user.id,
    publishedAt,
  });
}

export async function deletePost(postId: string){
  const postRef = doc(db, "posts", postId);
  const commentariesRef = collection(db, "commentaries");

  const commentariesQuery = query(commentariesRef, where("commentedOn", "==", postId));
  const commentaries = await getDocs(commentariesQuery)

  commentaries.forEach(async (doc) =>{
    await deleteDoc(doc.ref);
  });
  
  await deleteDoc(postRef);
}
 
export async function createCommentary(user: UserType, commentary: string, postId: string){
  await addDoc(collection(db, "commentaries"), {
    authorAvatar: user.userAvatar ? user.userAvatar : '',
    authorName: user.username,
    commentary,
    createdBy: user.id,
    publishedAt: serverTimestamp(),
    commentedOn: postId,
    likes: [],
  });
}

export async function deleteCommentary(commentaryId: string){
  const commentaryRef = doc(db, "commentaries", commentaryId);
  
  await deleteDoc(commentaryRef);
}

export async function addLikeOnCommentary(user: UserType, commentaryId: string){
  const commentaryRef = doc(db, "commentaries", commentaryId);

  const commentaryDocument = await getDoc(commentaryRef);
 
  const commentaryData = commentaryDocument.data() as CommentaryType;

  if(commentaryData.likes.includes(user.id)){
    await updateDoc(commentaryRef, {
      likes: arrayRemove(user.id),
    });
  }else{
    await updateDoc(commentaryRef, {
      likes: arrayUnion(user.id),
    });
  }
}
          