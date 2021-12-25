import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";

const PicturePreview = (props) => {
  const [likes, setLikes] = useState();
  const [liked, setLiked] = useState();
  const [dislikes, setDislikes] = useState();

  const [disliked, setDisliked] = useState();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const imageCreatorId = props.creatorId;

  const { sendRequest: fetchPicture } = useHttp();

  let isUserTheOwner = false;

  if (userId === imageCreatorId) {
    isUserTheOwner = true;
  }
  useEffect(() => {
    const transformPictures = (picturesObj) => {
      let likesAndDislikes = {
        likes: picturesObj.likes,
        dislikes: picturesObj.dislikes,
      };
      let counterLikes = 0;
      let counterDislikes = 0;
      for (const key in likesAndDislikes.likes) {
        if (likesAndDislikes.likes[key] === userId) {
          setLiked(true);
        }
        counterLikes++;
      }
      for (const key in likesAndDislikes.dislikes) {
        if (likesAndDislikes.dislikes[key] === userId) {
          setDisliked(true);
        }
        counterDislikes++;
      }
      setLikes(counterLikes);
      setDislikes(counterDislikes);
    };
    fetchPicture(
      {
        url: `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}.json`,
      },
      transformPictures
    );
  }, [fetchPicture, props.id, userId]);
  const deleteHandler = () => {
    if (
      window.confirm(
        "Are you sure you want to DELETE this image? It will be lost forever!"
      )
    ) {
      fetch(
        `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}.json`,
        {
          method: "DELETE",
        }
      );
      navigate(`/`);
    }
  };
  const likeHandler = () => {
    fetch(
      `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}/likes.json`,
      {
        method: "POST",
        body: JSON.stringify(userId),
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    liked(true);
  };
  const dislikeHandler = () => {
    fetch(
      `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}/dislikes.json`,
      {
        method: "POST",
        body: JSON.stringify(userId),
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    disliked(true);
    
  };
  const removeLikeHandler = () => {
    fetch(
      `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${props.id}/likes/${userId}.json`,
      {
        method: "DELETE"
      }
    );
  };
  const removeDislikeHandler = () => {};
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
              <div className="col-7">
                <p className="card-text">{props.name}</p>
              </div>
              <div className="col-1">
                {liked && (
                  <i
                    className="fas fa-thumbs-up"
                    onClick={removeLikeHandler}
                    style={{ color: `blue` }}
                  ></i>
                )}
                {!liked && (
                  <i className="far fa-thumbs-up" onClick={likeHandler}></i>
                )}
              </div>
              <div className="col-1">{likes}</div>
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
                    onClick={removeDislikeHandler}
                    style={{ color: `blue` }}
                  ></i>
                )}
              </div>
              <div className="col-1">{dislikes}</div>
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
