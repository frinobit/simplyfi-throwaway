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
          <span className="nav-welc">Welcome</span>
        </Link>
        <Link to="/simplyfi-throwaway">
          <span className="nav-snap">Snapshot</span>
        </Link>
        <Link to="/simplyfi-throwaway">
          <span className="nav-deep">Deep Dive</span>
        </Link>
        <Link to="/simplyfi-throwaway">
          <span className="nav-goal">Goals</span>
        </Link>
        <Link to="/simplyfi-throwaway">
          <span className="nav-love">Loved Ones</span>
        </Link>
        <Link to="/simplyfi-throwaway">
          <span className="nav-risk">Risk & Investment</span>
        </Link>
        <Link to="/simplyfi-throwaway/profile">
          <span>Profile</span>
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
              <span>Guest</span>
              <Link to="/simplyfi-throwaway">
                <span>SignupGuest</span>
              </Link>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
