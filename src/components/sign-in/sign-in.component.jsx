import { signInWithPopup } from "firebase/auth";
import React from "react";
import SignUpForm from "../sign-up/sign-up-form.component";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  //onClick handler.................
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    //console.log("Hi",response);
    const userDocref = createUserDocumentFromAuth(response.user);
  };

  return (
    <>
      <h1>Hi,I am from sign-in......</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUpForm/>
    </>
  );
};

export default SignIn;
