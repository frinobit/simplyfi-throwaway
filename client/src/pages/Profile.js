import SnapshotCSS from "../styles/pages/SnapshotBasic.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";

// context
import { usePersonalsContext } from "../hooks/usePersonalsContext";

// api
import { fetchPersonals } from "../components/snapshot/snapshotUtils/snapshotApi";

const Profile = () => {
  const { user } = useAuthContext();
  const [showSignUp, setShowSignUp] = useState(false);
  const { personals, dispatch: personalsDispatch } = usePersonalsContext();

  const handleBackToLogin = () => {
    setShowSignUp(false);
  };

  useEffect(() => {
    if (user) {
      fetchPersonals(user, personalsDispatch);
      console.log("hi");
    }
  }, [user, personalsDispatch]);

  return (
    <div className={SnapshotCSS.snapshot}>
      {user && (
        <div>
          <h2>User Profile</h2>
          <pre>{JSON.stringify(personals, null, 2)}</pre>
        </div>
      )}

      {!user && !showSignUp && (
        <Login onSignUpClick={() => setShowSignUp(true)} />
      )}

      {!user && showSignUp && <Signup onBackToLoginClick={handleBackToLogin} />}
    </div>
  );
};

export default Profile;
