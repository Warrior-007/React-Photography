import { useNavigate, Link } from "react-router-dom";
function Picture(props) {
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
  const handleOnSelect = () => {
    navigate(`/edit-image/${props.id}`);
  };

  return (
    <>
      <div className="container justify-content-center image-name">
        <h1>
          {isUserTheOwner && (
            <i
              onClick={handleOnSelect}
              className="fas fa-edit fa-sm"
              style={{ cursor: "pointer" }}
            ></i>
          )}
          {" " + props.name + " "}
          {isUserTheOwner && (
            <i
              className="fas fa-trash fa-sm"
              onClick={deleteHandler}
              style={{ cursor: "pointer" }}
            ></i>
          )}
        </h1>
        <Link to={`/album-information/${props.category}`}  style={{ textDecoration: "none" }}>
          <h4 className="text-center text-warning">{props.category}</h4>
        </Link>
        <br />
      </div>

      <div className="container justify-content-center align-items-center">
        <img src={props.url} className="img-fluid mx-auto d-block" alt="..." />
      </div>
    </>
  );
}
export default Picture;
