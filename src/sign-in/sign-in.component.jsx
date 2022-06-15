import { signInWithPopup } from "firebase/auth";
import React from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup } from "../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    //console.log("Hi",response);
    const userDocref = createUserDocumentFromAuth(response.user);
  };

  return (
    <>
      <h1>Hi,I am from sign-in......</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </>
  );
};

export default SignIn;
