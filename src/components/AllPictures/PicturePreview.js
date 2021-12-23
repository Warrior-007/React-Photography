import { Link, useNavigate } from "react-router-dom";

function PicturePreview(props) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const imageCreatorId = props.creatorId;

  let isUserTheOwner = false;
  if (userId === imageCreatorId) {
    isUserTheOwner = true;
  }

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
            <div className="col-12">
              <p className="card-text">{props.name}</p>
            </div>
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
}
export default PicturePreview;
