import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useLoginGuest } from "../hooks/useLoginGuest";
import { useLoginGoogle } from "../hooks/useLoginGoogle";

const Login = () => {
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

  return (
    <div className="login">
      {/* log in with email password*/}
      <form onSubmit={handleLogin}>
        <h3>Log In</h3>
        <label>Email address:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="button-container" disabled={isLoading}>
          Log In
        </button>
        {error && <div className="error">{error}</div>}
      </form>

      {/* log in as guest*/}
      <button
        className="button-container"
        disabled={isLoadingGuest}
        onClick={handleLoginGuest}
      >
        Log In As Guest
      </button>
      {errorGuest && <div className="error">{errorGuest}</div>}

      {/* log in with google*/}
      <button
        className="login-with-google-btn"
        disabled={isLoadingGoogle}
        onClick={() => {
          handleLoginGoogle();
          // signInWithGoogle();
        }}
      >
        Sign in with Google
      </button>
      {errorGoogle && <div className="error">{errorGoogle}</div>}
    </div>
  );
};

export default Login;
