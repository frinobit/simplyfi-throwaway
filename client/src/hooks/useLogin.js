import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { app } from "../config/firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const auth = getAuth(app);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const token = await user.getIdToken();

      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });
      const json = await response.json();

      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    } catch (error) {
      setError("Invalid login credentials");
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
