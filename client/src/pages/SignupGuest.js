import { useState } from "react";
import { useSignupGuest } from "../hooks/useSignupGuest";
import { useSignupGuestGoogle } from "../hooks/useSignupGuestGoogle";

const SignupGuest = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signupGuest, error, isLoading } = useSignupGuest();
  const { signupGuestGoogle, errorGoogle, isLoadingGoogle } =
    useSignupGuestGoogle();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signupGuest(email, password);
  };

  return (
    <div className="signup">
      {/* sign up guest with email password*/}
      <form onSubmit={handleSubmit}>
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

      {/* log in guest with google*/}
      <button
        className="login-with-google-btn"
        disabled={isLoadingGoogle}
        onClick={() => {
          signupGuestGoogle();
        }}
      >
        Sign in with Google
      </button>
      {errorGoogle && <div className="error">{errorGoogle}</div>}
    </div>
  );
};

export default SignupGuest;
