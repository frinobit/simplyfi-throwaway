import LoginCSS from "../../styles/components/loginSignup.module.css";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useLoginGuest } from "../../hooks/useLoginGuest";
import { useLoginGoogle } from "../../hooks/useLoginGoogle";

const Login = ({ onSignUpClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const { loginGuest, errorGuest, isLoadingGuest } = useLoginGuest();
  const { loginGoogle, errorGoogle, isLoadingGoogle } = useLoginGoogle();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleLoginGuest = async () => {
    await loginGuest();
  };

  const handleLoginGoogle = async () => {
    await loginGoogle();
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    onSignUpClick();
  };

  return (
    <div className={LoginCSS.login}>
      <p className={LoginCSS.login_title}>Sign in to Simply Ask</p>
      <p className={LoginCSS.login_desc}>
        Create a profile to save your progress!
      </p>

      {/* sign up / login with google*/}
      <button
        className={LoginCSS.login_with_google_btn}
        disabled={isLoadingGoogle}
        onClick={() => {
          handleLoginGoogle();
        }}
      >
        Sign in with Google
      </button>
      {errorGoogle && <div className="error">{errorGoogle}</div>}

      <div className={LoginCSS.line_or}></div>

      {/* log in with email password*/}
      <form onSubmit={handleLogin}>
        <label>Login</label>
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
        <button disabled={isLoading}>Log In</button>
        {error && <div className="error">{error}</div>}
      </form>

      <div className={LoginCSS.form_link}>
        <a href="/simplyfi-throwaway">Forgot password?</a>
      </div>

      <div className={LoginCSS.form_link}>
        <span>
          Don't have an account?&nbsp;
          <a href="/simplyfi-throwaway" onClick={handleSignUpClick}>
            Sign Up
          </a>
        </span>
      </div>

      {/* log in as guest*/}
      <button disabled={isLoadingGuest} onClick={handleLoginGuest}>
        Log In As Guest
      </button>
      {errorGuest && <div className="error">{errorGuest}</div>}
    </div>
  );
};

export default Login;
