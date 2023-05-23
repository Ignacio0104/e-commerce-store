import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import "./LoginForm.css";
import * as yup from "yup";
import CustomInput from "../pure/CustomInput";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("This field is required!"),
  password: yup.string().required("This field is required!"),
});

const LoginForm = () => {
  const [loginRequest, setLoginRequest] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState("password");
  const handleChange = (field: string, value: string) => {
    setLoginRequest({ ...loginRequest, [field]: value });
  };

  const handleSubmit = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, loginRequest.email, loginRequest.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const tooglePassword = () => {
    setPasswordVisible(passwordVisible === "password" ? "text" : "password");
  };
  return (
    <div className="login-container">
      <div className="manual-login-container">
        <Formik
          initialValues={loginRequest}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
        >
          {(props) => (
            <Form className="input-container">
              <CustomInput
                label="Email"
                name="email"
                type="text"
                placeholder="Email..."
                handleChange={handleChange}
              ></CustomInput>
              <div className="password-container">
                <CustomInput
                  label="Password"
                  name="password"
                  type={passwordVisible}
                  placeholder="Password..."
                  handleChange={handleChange}
                ></CustomInput>
                <div className="eye-icon-container" onClick={tooglePassword}>
                  {passwordVisible === "password" ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </div>
              </div>
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
