import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import "../styles/ForgotPasswordScreen.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase/config";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
});

const ForgotPasswordScreen: React.FC = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (values: any) => {
    try {
      await sendPasswordResetEmail(auth, values.email);
      setMessage("Password reset email sent! Check your inbox.");
      setError("");
    } catch (error) {
      //@ts-ignore
      setError("Error occurred: " + error.message);
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="forgot-password-screen">
      <h1 className="forgot-title">Reset your password</h1>
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

        {message && <div className="success">{message}</div>}
        {error && <div className="error">{error}</div>}

        <div className="forgot-password-container">
          <p>Try logging in?</p>
          <a href="/login">Click here</a>
        </div>
        <button type="submit" className="reset-button">
          Send Reset Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;
