import LoginCSS from "../styles/components/loginSignup.module.css";
import { useState } from "react";
import { useSignupGuest } from "../hooks/useSignupGuest";
import { useSignupGuestGoogle } from "../hooks/useSignupGuestGoogle";

const SignupGuest = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signupGuest, error, isLoading } = useSignupGuest();
  const { signupGuestGoogle, errorGoogle, isLoadingGoogle } =
    useSignupGuestGoogle();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signupGuest(email, password);
  };

  return (
    <div className={LoginCSS.login}>
      <p className={LoginCSS.login_title}>Sign in to Simply Ask</p>
      <p className={LoginCSS.login_desc}>
        Create a profile to save your progress!
      </p>

      {/* sign up / login guest with google*/}
      <button
        className={LoginCSS.login_with_google_btn}
        disabled={isLoadingGoogle}
        onClick={() => {
          signupGuestGoogle();
        }}
      >
        Sign in with Google
      </button>
      {errorGoogle && <div className="error">{errorGoogle}</div>}

      <div className={LoginCSS.line_or}></div>

      {/* sign up guest with email password*/}
      <form onSubmit={handleSignup}>
        <label>Sign Up Guest</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
        <button disabled={isLoading}>Sign Up Guest</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default SignupGuest;
