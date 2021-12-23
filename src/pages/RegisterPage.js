import Register from "../components/Register/Register";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const RegisterPage = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  function registerHandler(userData) {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLE6k0sY-L7TgAelfb-Jtmc6tf2dXLJN8",
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
      .then((res) => {
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
  return <Register onRegister={registerHandler} />;
};

export default RegisterPage;
