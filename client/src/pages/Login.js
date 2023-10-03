import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useLoginGuest } from "../hooks/useLoginGuest";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const { loginGuest, errorGuest, isLoadingGuest } = useLoginGuest();

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  const handleLoginGuest = async (e) => {
    e.preventDefault();

    await loginGuest();
  };

  return (
    <div>
      <form className="login" onSubmit={handleLogin}>
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
        <button
          className="button-container"
          disabled={isLoadingGuest}
          onClick={handleLoginGuest}
        >
          Log In As Guest
        </button>

        {errorGuest && <div className="error">{errorGuest}</div>}
      </form>
    </div>
  );
};

export default Login;
