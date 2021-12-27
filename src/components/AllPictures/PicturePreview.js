import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
const PicturePreview = (props) => {
  const navigate = useNavigate();
  const { sendRequest: deletePictureRequest } = useHttp();
  const { sendRequest: likePictureRequest } = useHttp();

  const [likes, setLikes] = useState();
  const [liked, setLiked] = useState();
  const [usersLiked, setUserLiked] = useState([]);

  const [dislikes, setDislikes] = useState();
  const [disliked, setDisliked] = useState();
  const [usersDisliked, setUserDisliked] = useState([]);

  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");

  const imageCreatorId = props.creatorId;

  let isUserTheOwner = false;
  if (userId === imageCreatorId) {
    isUserTheOwner = true;
  }

  useEffect(() => {
    let counterLikes = 0;
    let counterDislikes = 0;

    for (const key in props.likes) {
      if (key === userId) {
        setLiked(true);
      }
      counterLikes++;
    }
    for (const key in props.dislikes) {
      if (key === userId) {
        setDisliked(true);
      }
      counterDislikes++;
    }
    setLikes(counterLikes);
    setDislikes(counterDislikes);

    const transformLikes = (pictureObj) => {
      let loadedLikes = [];
      for (const key in pictureObj.likes) {
        loadedLikes.push(pictureObj.likes[key].email);
      }
      setUserLiked(loadedLikes);
    };
    likePictureRequest(
      {
        url: `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}.json`,
      },
      transformLikes
    );
    const transformDislikes = (pictureObj) => {
      let loadedDislikes = [];
      for (const key in pictureObj.dislikes) {
        loadedDislikes.push(pictureObj.dislikes[key].email);
      }
      setUserDisliked(loadedDislikes);
    };
    likePictureRequest(
      {
        url: `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}.json`,
      },
      transformDislikes
    );
  }, [props.dislikes, props.likes, props.id, userId, likePictureRequest]);

  const deleteHandler = () => {
    if (
      window.confirm(
        "Are you sure you want to DELETE this image? It will be lost forever!"
      )
    ) {
      deletePictureRequest({
        url: `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}.json`,
        method: "DELETE",
      });

      navigate(`/`);
    }
  };
  const likeHandler = () => {
    if (userId) {
      if (disliked) {
        likePictureRequest({
          url: `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}/dislikes/${userId}.json`,
          method: "DELETE",
        });
        setDislikes(dislikes - 1);
        setDisliked(false);

        let usersDislikedArray = usersDisliked;

        var index = usersDislikedArray.indexOf(email);
        if (index !== -1) {
          usersDislikedArray.splice(index, 1);
        }
        setUserDisliked(usersDislikedArray);
      }
      if (!liked) {
        likePictureRequest({
          url: `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}/likes/${userId}.json`,
          method: "PUT",
          body: { email: email },
          header: {
            "Content-Type": "application/json",
          },
        });
        setLikes(likes + 1);
        setLiked(true);

        let usersLikedArray = usersLiked;
        usersLikedArray.push(email);
        setUserLiked(usersLikedArray);
      } else {
        likePictureRequest({
          url: `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}/likes/${userId}.json`,
          method: "DELETE",
        });

        setLiked(false);
        setLikes(likes - 1);

        let usersLikedArray = usersLiked;
        let index = usersLikedArray.indexOf(email);
        if (index !== -1) {
          usersLikedArray.splice(index, 1);
        }
        setUserLiked(usersLikedArray);
      }
    }
  };
  const dislikeHandler = () => {
    if (userId) {
      if (liked) {
        likePictureRequest({
          url: `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}/likes/${userId}.json`,
          method: "DELETE",
        });

        setLiked(false);
        setLikes(likes - 1);

        let usersLikedArray = usersLiked;
        let index = usersLikedArray.indexOf(email);
        if (index !== -1) {
          usersLikedArray.splice(index, 1);
        }
        setUserLiked(usersLikedArray);
      }
      if (!disliked) {
        likePictureRequest({
          url: `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}/dislikes/${userId}.json`,
          method: "PUT",
          body: { email: email },
          header: {
            "Content-Type": "application/json",
          },
        });

        setDislikes(dislikes + 1);
        setDisliked(true);

        let usersDislikedArray = usersDisliked;
        usersDislikedArray.push(email);
        setUserDisliked(usersDislikedArray);
      } else {
        likePictureRequest({
          url: `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}/dislikes/${userId}.json`,
          method: "DELETE",
        });

        setDislikes(dislikes - 1);
        setDisliked(false);

        let usersDislikedArray = usersDisliked;
        let index = usersDislikedArray.indexOf(email);
        if (index !== -1) {
          usersDislikedArray.splice(index, 1);
        }
        setUserDisliked(usersDislikedArray);
      }
    }
  };

  const dropdownLikes = usersLiked.map((email) => <li>{email}</li>);
  const dropdownDislikes = usersDisliked.map((email) => <li>{email}</li>);
  return (
    <div
      className="col"
      id={props.id}
      category={props.name}
      onClick={props.onClick}
    >
      <div className="card">
        <Link
          className="card-image-a"
          to={props.link}
          style={{ textDecoration: "none" }}
        >
          <img className="card-img-top" src={props.url} alt="" />
        </Link>
        <div className="card-body row">
          {props.isThisCategory && (
            <div className="col-12">
              <p className="card-text">{props.name}</p>
            </div>
          )}
          {!isUserTheOwner && !props.isThisCategory && (
            <>
              <div className="col-5">
                <p className="card-text">{props.name}</p>
              </div>
              <div className="col-1">
                {liked && (
                  <i
                    className="fas fa-thumbs-up"
                    onClick={likeHandler}
                    style={{ color: `blue` }}
                  ></i>
                )}
                {!liked && (
                  <i className="far fa-thumbs-up" onClick={likeHandler}></i>
                )}
              </div>
              <div className="col-2">
                <div className="dropdown">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    type="button"
                    id={props.id}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {likes}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby={props.id}>
                    {dropdownLikes}
                  </ul>
                </div>
              </div>
              <div className="col-1">
                {!disliked && (
                  <i
                    className="fas fa-thumbs-down"
                    onClick={dislikeHandler}
                  ></i>
                )}
                {disliked && (
                  <i
                    className="fas fa-thumbs-down"
                    onClick={dislikeHandler}
                    style={{ color: `blue` }}
                  ></i>
                )}
              </div>
              <div className="col-2">
                <div className="dropdown">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    type="button"
                    id={props.id}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {dislikes}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby={props.id}>
                    {dropdownDislikes}
                  </ul>
                </div>
              </div>
            </>
          )}
          {isUserTheOwner && (
            <>
              <div className="col-4">
                <p className="card-text">{props.name}</p>
              </div>
              <div className="col-2">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-success btn-sm dropdown-toggle"
                    type="button"
                    id={props.id}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {likes}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby={props.id}>
                    {dropdownLikes}
                  </ul>
                </div>
              </div>
              <div className="col-2">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-danger btn-sm dropdown-toggle"
                    type="button"
                    id={props.id}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {dislikes}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby={props.id}>
                    {dropdownDislikes}
                  </ul>
                </div>
              </div>
              <div className="col-2">
                <Link
                  className="card-image-a"
                  to={`/edit-image/${props.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <i className="fas fa-edit float-left"></i>
                </Link>
              </div>
              <div className="col-2">
                <i
                  className="fas fa-trash float-right"
                  onClick={deleteHandler}
                ></i>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default PicturePreview;
