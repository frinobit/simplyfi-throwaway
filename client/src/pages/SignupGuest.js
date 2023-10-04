import { useState } from "react";
import { useSignupGuest } from "../hooks/useSignupGuest";

const SignupGuest = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signupGuest, error, isLoading } = useSignupGuest();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signupGuest(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up Guest</h3>

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

      <button disabled={isLoading}>Sign Up Guest</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignupGuest;
