import { Link } from "react-router-dom";

const Navbar = () => {
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
      </div>
    </header>
  );
};

export default Navbar;
