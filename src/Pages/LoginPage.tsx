import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import LoginForm from "../components/Login/LoginForm";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";

const LoginPage = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const db = getFirestore(app);

  const handleGoogleLogin = () => {
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const email = result.user.email;
        const docRef = collection(db, "users");
        const userQuery = query(docRef, where("email", "==", email));
        const querySnapshot = await getDocs(userQuery);
        if (querySnapshot.docs.length > 0) {
          console.log("user already in system");
        } else {
          console.log("new user");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div>
      <LoginForm />
      <button onClick={handleGoogleLogin}>Login Google</button>
    </div>
  );
};

export default LoginPage;
