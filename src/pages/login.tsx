import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../styles/LoginScreen.scss";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthStore from "../context/userStore";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/config";

const LoginScreen: React.FC = () => {
  const [error, setError] = useState("");
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      pwd: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      pwd: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Login with:", values);
      loginWithEmail(values);
    },
  });

  const loginWithEmail = async (values: any) => {
    try {
      const signIn = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.pwd
      );
      setUser(signIn.user);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      //@ts-ignore
      setError("Error occured", error.message);
    }
  };

  return (
    <div className="login-screen">
      <h1 className="login-title">Login to your account</h1>
      <form onSubmit={formik.handleSubmit} className="entry-boxes">
        <div>
          <div className="input-container">
            <FaEnvelope className="input-icon" />
            <input
              type="text"
              placeholder="Enter your Email"
              className="email-entry"
              {...formik.getFieldProps("email")}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <div className="input-container">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Enter your password"
              className="password-entry"
              {...formik.getFieldProps("pwd")}
            />
          </div>
          {formik.touched.pwd && formik.errors.pwd ? (
            <div className="error">{formik.errors.pwd}</div>
          ) : null}
          {error && <div className="error">{error}</div>}
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
