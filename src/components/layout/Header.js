import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import logo from "../Files/whiteLogo.png"; // with import
import AuthContext from "../../store/auth-context";
import { ReactSearchAutocomplete } from "react-search-autocomplete";





function Header() {
 
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const [picturesNames, setPicturesNames] = useState([]);

  useEffect(() => {
    const fetchPictures = async () => {
      const response = await fetch(
        "https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures.json"
      );
      const responseData = await response.json();

      const loadedPicturesNames = [];

      for (const key in responseData) {
        loadedPicturesNames.push({
          id: key,
          name: responseData[key].name,
        });
      }

      setPicturesNames(loadedPicturesNames);
    };
    fetchPictures();
  }, []);

  const items = picturesNames;

  const logoutHandler = () => {
    authCtx.logout();
  };

  const handleOnSelect = (item) => {
    navigate(`/image-information/${item.id}`);
    
  }
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

          {/*<form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control form-control-dark"
              placeholder="Search..."
              aria-label="Search"
            />
            </form>*/}
          <div id="search-bar">
            <ReactSearchAutocomplete
              items={items}
              onSelect={handleOnSelect}
              placeholder="Search here...something?"
            />
          </div>

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
