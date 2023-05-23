import { getAuth, signOut } from "firebase/auth";

const UserInfoPage = () => {
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth);
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserInfoPage;
