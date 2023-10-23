import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { app } from "../config/firebase-config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const useSignupGuest = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const auth = getAuth(app);

  const signupGuest = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const old_uid = auth.currentUser.uid;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const new_uid = user.uid;
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

      setIsLoading(false);
    } catch (error) {
      setError("User with this email already exists");
      setIsLoading(false);
    }
  };

  return { signupGuest, isLoading, error };
};
