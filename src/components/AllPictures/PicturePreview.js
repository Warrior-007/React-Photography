import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";

const PicturePreview = (props) => {
  const navigate = useNavigate();
  const { sendRequest: deletePictureRequest } = useHttp();
  const { sendRequest: likePictureRequest } = useHttp();

  const [likes, setLikes] = useState();
  const [liked, setLiked] = useState();

  const [dislikes, setDislikes] = useState();
  const [disliked, setDisliked] = useState();

  const userId = localStorage.getItem("userId");
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
  }, [props.dislikes, props.likes, userId]);

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
      }
      if (!liked) {
        likePictureRequest({
          url: `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}/likes/${userId}.json`,
          method: "PUT",
          body: { userId: userId },
          header: {
            "Content-Type": "application/json",
          },
        });
        setLikes(likes + 1);
        setLiked(true);
      } else {
        if (liked) {
          likePictureRequest({
            url: `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}/likes/${userId}.json`,
            method: "DELETE",
          });

          setLiked(false);
          setLikes(likes - 1);
        }
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
      }
      if (!disliked) {
        likePictureRequest({
          url: `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}/dislikes/${userId}.json`,
          method: "PUT",
          body: { userId: userId },
          header: {
            "Content-Type": "application/json",
          },
        });
        setDislikes(dislikes + 1);
        setDisliked(true);
      } else {
        likePictureRequest({
          url: `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}/dislikes/${userId}.json`,
          method: "DELETE",
        });
        setDislikes(dislikes - 1);
        setDisliked(false);
      }
    }
  };

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
          {!isUserTheOwner && (
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
              <div className="col-2">{likes}</div>
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
              <div className="col-2">{dislikes}</div>
            </>
          )}

          {isUserTheOwner && (
            <>
              <div className="col-8">
                <p className="card-text">{props.name}</p>
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
                  style={{ cursor: "pointer" }}
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
