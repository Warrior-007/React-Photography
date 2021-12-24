import { useState, useRef } from "react";

import LoadingSpinner from "../Layout/LoadingSpinner";

function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
      /*setIsLoading(true);*/
    
    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    props.onLogin(userData);
  };
  return (
    <div
      className="modal modal-signin position-static d-block py-5"
      tabIndex="-1"
      role="dialog"
      id="modalSignin"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-5 shadow">
          <div className="modal-header p-5 pb-4 border-bottom-0">
            <h2 className="fw-bold mb-0">Login to your account</h2>
            <button
              type="button"
              className="btn-close "
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-5 pt-0">
            <form onSubmit={submitHandler}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control rounded-4"
                  id="floatingInput"
                  placeholder="name@example.com"
                  ref={emailInputRef}
                  required
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control rounded-4"
                  id="floatingPassword"
                  placeholder="Password"
                  ref={passwordInputRef}
                  required
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button
                className="w-100 mb-2 btn btn-lg rounded-4 btn-warning"
                type="submit"
              >
                {!isLoading && "Login"}
                {isLoading && <LoadingSpinner />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
