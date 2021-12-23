import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";
function Profile() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const passwordInputRef = useRef();
  const email = localStorage.getItem("email");
  function changePasswordHandler(event) {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBLE6k0sY-L7TgAelfb-Jtmc6tf2dXLJN8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("Data" + data);
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(
          data.idToken,
          expirationTime.toISOString(),
          data.localId,
          data.email
        );
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  function deleteAccountHandler(event) {
    event.preventDefault();
    alert("Deleting your account");
  }
  return (
    <div className="container p-5 ">
      <h2 className="fw-bold mb-5 mx-auto text-center">
        Hello <span style={{ color: "#ffc107" }}>{email}</span>! This is your
        profile :)
      </h2>

      <form onSubmit={changePasswordHandler}>
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="staticEmail"
              value={email}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Change Password
          </label>
          <div className="col-sm-5">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Your New Password"
              ref={passwordInputRef}
            />
          </div>
          <div className="col-sm-4">
            <button type="submit" className="btn btn-success px-4">
              Update Password
            </button>
          </div>
        </div>
      </form>
      <form onSubmit={deleteAccountHandler}>
        <button type="submit" className="btn btn-danger px-4 mt-5">
          DELETE YOUR ACCOUNT
        </button>
      </form>
    </div>
  );
}
export default Profile;
