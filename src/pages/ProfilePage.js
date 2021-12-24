import Profile from "../components/Profile/Profile";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { useContext, useEffect, useState } from "react";
import useHttp from "../hooks/use-http";

const ProfilePage = () => {
  const [pictures, setPictures] = useState([]);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const { sendRequest: fetchPictures } = useHttp();
  useEffect(() => {
    const transformPictures = (picturesObj) => {
      const loadedPictures = [];
      const userId = localStorage.getItem("userId");

      for (const key in picturesObj) {
        if (picturesObj[key].creatorId === userId) {
          loadedPictures.push({
            id: key,
          });
        }
      }

      setPictures(loadedPictures);
    };

    fetchPictures(
      {
        url: "https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures.json",
      },
      transformPictures
    );
  }, [fetchPictures]);

  function changePasswordHandler(userData) {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBLE6k0sY-L7TgAelfb-Jtmc6tf2dXLJN8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: userData.token,
          password: userData.enteredPassword,
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
        authCtx.logout();
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
  function deleteAccountHandler(userData) {
    for (const key in pictures) {
      const id = pictures[key].id;
      fetch(
        `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${id}.json`,
        {
          method: "DELETE",
        }
      );
    }
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyBLE6k0sY-L7TgAelfb-Jtmc6tf2dXLJN8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: userData.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    authCtx.logout();
    navigate("/");
  }
  return (
    <Profile onChange={changePasswordHandler} onDelete={deleteAccountHandler} />
  );
};

export default ProfilePage;
