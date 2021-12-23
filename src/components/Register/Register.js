import { useState, useRef } from "react";

import LoadingSpinner from "../Layout/LoadingSpinner";

function Register(props) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    props.onRegister(userData);
  };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 mb-3">
            Welcome to Photography World
          </h1>

          <p className="col-lg-10 fs-4">
            Feel free to join us and start uploading images!
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form
            className="p-4 p-md-5 border rounded-3 bg-light"
            onSubmit={submitHandler}
          >
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
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
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                ref={passwordInputRef}
                required
              />
              <label htmlFor="floatingPassword">Create Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-warning" type="submit">
              {!isLoading && "Sign up"}
              {isLoading && <LoadingSpinner />}
            </button>
            <hr className="my-4" />

            <small className="text-muted">
              By clicking Sign up, you agree to the terms of use.
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
