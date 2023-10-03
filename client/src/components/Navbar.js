import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/simplyfi-throwaway">
          <h1>Simplyfi</h1>
        </Link>
        <Link to="/simplyfi-throwaway">
          <h3>Home</h3>
        </Link>
        <Link to="/simplyfi-throwaway/profile">
          <h3>Profile</h3>
        </Link>
        <nav>
          {user && user.email && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          {user && !user.email && (
            <div>
              <span>Logged in as guest</span>
              <Link to="/simplyfi-throwaway/login">Login</Link>
              <Link to="/simplyfi-throwaway/signup">Signup</Link>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/simplyfi-throwaway/login">Login</Link>
              <Link to="/simplyfi-throwaway/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
