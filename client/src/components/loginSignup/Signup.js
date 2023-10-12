import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useLoginGoogle } from "../../hooks/useLoginGoogle";

const Signup = ({ onBackToLoginClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const { loginGoogle, errorGoogle, isLoadingGoogle } = useLoginGoogle();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  const handleLoginGoogle = async () => {
    await loginGoogle();
  };

  const handleBackToLoginClick = (e) => {
    e.preventDefault();
    onBackToLoginClick();
  };

  return (
    <div className="signup">
      <p className="login-title">Sign in to Simply Ask</p>
      <p className="login-desc">Create a profile to save your progress!</p>

      {/* sign up / login with google*/}
      <button
        className="login-with-google-btn"
        disabled={isLoadingGoogle}
        onClick={() => {
          handleLoginGoogle();
        }}
      >
        Sign in with Google
      </button>
      {errorGoogle && <div className="error">{errorGoogle}</div>}

      <div className="line-or"></div>

      <form onSubmit={handleSignup}>
        <label>Sign Up</label>
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
        <button className="button-container" disabled={isLoading}>
          Sign Up
        </button>
        {error && <div className="error">{error}</div>}
      </form>

      <div className="form-link">
        <span>
          Have an account?&nbsp;
          <a href="/simplyfi-throwaway/login" onClick={handleBackToLoginClick}>
            Login
          </a>
        </span>
      </div>
    </div>
  );
};

export default Signup;
