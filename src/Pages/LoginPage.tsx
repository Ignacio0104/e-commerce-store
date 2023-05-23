import LoginForm from "../components/Login/LoginForm";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const LoginPage = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleGoogleLogin = () => {
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log(user);
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
