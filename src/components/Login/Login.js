function Register() {
  const css = `
    #modalSignin {
        background-color: #212529;
    }
`
  return (
    <div
      className="modal modal-signin position-static d-block py-5"
      tabIndex="-1"
      role="dialog"
      id="modalSignin"
    >
      <style>
        {css}
      </style>
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-5 shadow">
          <div className="modal-header p-5 pb-4 border-bottom-0">
            <h2 className="fw-bold mb-0">Login to your account</h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-5 pt-0">
            <form className="">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control rounded-4"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control rounded-4"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me" /> Remember me
                </label>
              </div>
              <button
                className="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
