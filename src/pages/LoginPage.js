import Login from "../components/Login/Login";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const LoginPage = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  function loginHandler(userData) {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLE6k0sY-L7TgAelfb-Jtmc6tf2dXLJN8",
      {
        method: "POST",
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          response.json().then(() => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
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
        alert("Oops, there is a problem! Try again");
      });
  }

  return <Login onLogin={loginHandler} />;
};

export default LoginPage;
