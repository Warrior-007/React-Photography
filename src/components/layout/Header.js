import { Link } from "react-router-dom";
import { useContext } from "react";
import logo from "../Files/whiteLogo.png"; // with import
import AuthContext from "../../store/auth-context";

function Header() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <img
              src={logo}
              className="bi me-2"
              width="70"
              aria-label="Bootstrap"
            ></img>
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 text-secondary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-images" className="nav-link px-2 text-white">
                All Images
              </Link>
            </li>
            {/* 
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                role="button"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    Another action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    Something else here
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    Separated link
                  </Link>
                </li>
              </ul>
            </li>
            */}
            <li>
              <Link to="/all-albums" className="nav-link px-2 text-white">
                Categories
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link to="/upload-image" className="nav-link px-2 text-white">
                  Upload Image
                </Link>
              </li>
            )}
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control form-control-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
          <div className="text-end">
            {!isLoggedIn && (
              <>
                <Link to="/login">
                  <button type="button" className="btn btn-outline-light me-2">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button type="button" className="btn btn-warning">
                    Sign-up
                  </button>
                </Link>
              </>
            )}
            {isLoggedIn && (
              <button
                type="button"
                className="btn btn-outline-light me-2"
                onClick={logoutHandler}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
