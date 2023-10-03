import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLoginGuest = () => {
  const [errorGuest, setErrorGuest] = useState(null);
  const [isLoadingGuest, setIsLoadingGuest] = useState(null);
  const { dispatch } = useAuthContext();

  const loginGuest = async () => {
    const response = await fetch("/api/user/loginGuest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoadingGuest(false);
      setErrorGuest(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoadingGuest(false);
    }
  };

  return { loginGuest, isLoadingGuest, errorGuest };
};
