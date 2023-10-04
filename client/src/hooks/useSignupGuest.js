import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignupGuest = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user, dispatch } = useAuthContext();

  const token = user.token;

  const signupGuest = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/signupGuest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, token }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { signupGuest, isLoading, error };
};
