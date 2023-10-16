import NavbarCSS from "../../styles/components/Navbar.module.css";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <div className={NavbarCSS.container}>
        <Link to="/simplyfi-throwaway">
          <span className={NavbarCSS.nav_welc}>Welcome</span>
        </Link>
        <Link to="/simplyfi-throwaway/snapshot">
          <span className={NavbarCSS.nav_snap}>Snapshot</span>
        </Link>
        <Link to="/simplyfi-throwaway">
          <span className={NavbarCSS.nav_deep}>Deep Dive</span>
        </Link>
        <Link to="/simplyfi-throwaway">
          <span className={NavbarCSS.nav_goal}>Goals</span>
        </Link>
        <Link to="/simplyfi-throwaway">
          <span className={NavbarCSS.nav_love}>Loved Ones</span>
        </Link>
        <Link to="/simplyfi-throwaway">
          <span className={NavbarCSS.nav_risk}>Risk & Investment</span>
        </Link>
      </div>
      <div className={NavbarCSS.container}>
        <nav>
          {user && user.email && (
            <div className={NavbarCSS.user_active}>
              <span>{user.email}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
          {user && !user.email && (
            <div className={NavbarCSS.user_active}>
              <span>Guest</span>
              <Link to="/simplyfi-throwaway/signupGuest">
                <span className={NavbarCSS.guest_span}>Signup</span>
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </nav>
      </div>
      <div className={NavbarCSS.container}>
        <nav className={NavbarCSS.nav_right}>
          <ul className={NavbarCSS.nav_right_nav}>
            <li>
              <img
                src="/simplyfi-throwaway/assets/icon_guest.svg"
                alt="icon_guest"
              />
            </li>
            <li>
              <Link to="/simplyfi-throwaway">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M14.385 15.446a6.75 6.75 0 1 1 1.06-1.06l5.156 5.155a.75.75 0 1 1-1.06 1.06l-5.156-5.155Zm-7.926-1.562a5.25 5.25 0 1 1 7.43-.005l-.005.005l-.005.004a5.25 5.25 0 0 1-7.42-.004Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link to="/simplyfi-throwaway">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M2 8.994A5.99 5.99 0 0 1 8 3h8c3.313 0 6 2.695 6 5.994V21H8c-3.313 0-6-2.695-6-5.994V8.994ZM20 19V8.994A4.004 4.004 0 0 0 16 5H8a3.99 3.99 0 0 0-4 3.994v6.012A4.004 4.004 0 0 0 8 19h12Zm-6-8h2v2h-2v-2Zm-6 0h2v2H8v-2Z"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link to="/simplyfi-throwaway" className={NavbarCSS.share_button}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18 22q-1.25 0-2.125-.875T15 19q0-.175.025-.363t.075-.337l-7.05-4.1q-.425.375-.95.588T6 15q-1.25 0-2.125-.875T3 12q0-1.25.875-2.125T6 9q.575 0 1.1.213t.95.587l7.05-4.1q-.05-.15-.075-.337T15 5q0-1.25.875-2.125T18 2q1.25 0 2.125.875T21 5q0 1.25-.875 2.125T18 8q-.575 0-1.1-.212t-.95-.588L8.9 11.3q.05.15.075.338T9 12q0 .175-.025.363T8.9 12.7l7.05 4.1q.425-.375.95-.587T18 16q1.25 0 2.125.875T21 19q0 1.25-.875 2.125T18 22Z"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
