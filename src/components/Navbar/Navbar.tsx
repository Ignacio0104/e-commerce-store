import { Link } from "react-router-dom";
import "./Navbar.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
      const uid = user.uid;
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <div className="nav-main-container">
      <div className="logo-container">
        <Link to="/">
          <h4>Logo</h4>
        </Link>
      </div>
      <div className="options-container">
        <Link to="#">Categories</Link>
        <Link to="#">Deals</Link>
        <Link to="#">Newest</Link>
      </div>
      {isLoggedIn ? (
        <div className="navbar-user-container">
          <Link to="/user-info">
            <AccountCircleOutlinedIcon />
          </Link>
        </div>
      ) : (
        <div className="login-container">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
