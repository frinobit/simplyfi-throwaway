import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { app } from "../config/firebase-config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const useSignupGuestGoogle = () => {
  const [errorGoogle, setErrorGoogle] = useState(null);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(null);
  const { dispatch } = useAuthContext();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signupGuestGoogle = async () => {
    setIsLoadingGoogle(true);
    setErrorGoogle(null);

    try {
      const old_uid = auth.currentUser.uid;
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const new_uid = user.uid;
      const email = user.email;
      const token = await user.getIdToken();

      const response = await fetch("/api/user/signupGuest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ old_uid, new_uid, email, token }),
      });
      const json = await response.json();

      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoadingGoogle(false);
    } catch (error) {
      setErrorGoogle("An error occurred. Please try again later.");
      setIsLoadingGoogle(false);
    }
  };

  return { signupGuestGoogle, isLoadingGoogle, errorGoogle };
};
