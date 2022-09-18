import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

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
  id: string;
  createdAt?: Date;
  username?: string;
  email?: string;
  password?: string;
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

  return foundUser?.data().password;
}
 
          