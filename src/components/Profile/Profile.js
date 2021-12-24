import { useRef } from "react";

function Profile(props) {
  const passwordInputRef = useRef();
  const email = localStorage.getItem("email");

  function changePassword(event) {
    event.preventDefault();
    const enteredPassword = passwordInputRef.current.value;
    const userData = {
      token: localStorage.getItem("token"),
      enteredPassword: enteredPassword,
    };
    if (window.confirm("Are you sure you want to CHANGE your password? ")) {
      props.onChange(userData);
    }
  }

  function deleteAccount(event) {
    event.preventDefault();
    const userData = {
      token: localStorage.getItem("token"),
    };
    if (
      window.confirm(
        "Are you sure you want to DELETE your ACCOUNT? It will be lost forever! Also, all of your images will be DELETED FOREVER"
      )
    ) {
      props.onDelete(userData);
    }
  }
  return (
    <div className="container p-5 ">
      <h2 className="fw-bold mb-5 mx-auto text-center">
        Hello <span style={{ color: "#ffc107" }}>{email}</span>! This is your
        profile :)
      </h2>

      <form onSubmit={changePassword}>
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
      <form onSubmit={deleteAccount}>
        <button type="submit" className="btn btn-danger px-4 mt-5">
          DELETE YOUR ACCOUNT
        </button>
      </form>
    </div>
  );
}
export default Profile;
