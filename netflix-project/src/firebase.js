
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
        createUserWithEmailAndPassword,
        getAuth,
        signInWithEmailAndPassword, 
        signOut} from "firebase/auth";
import { addDoc,
        collection,
        getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyAYJfTkS7rCNF6f2VjHsGULs8tzs4NwyxM",
  authDomain: "netflix-project-d7ace.firebaseapp.com",
  projectId: "netflix-project-d7ace",
  storageBucket: "netflix-project-d7ace.appspot.com",
  messagingSenderId: "1005439290892",
  appId: "1:1005439290892:web:e25dfddf77eb11a59ca829",
  measurementId: "G-FPQ5XF3280"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=> {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    } 
}

const login = async(email, password) => {
    try {
    await signInWithEmailAndPassword(auth, email, password);
    } catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout= ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout}