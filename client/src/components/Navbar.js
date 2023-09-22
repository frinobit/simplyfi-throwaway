import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/simplyfi-throwaway">
          <h1>Simplyfi</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
