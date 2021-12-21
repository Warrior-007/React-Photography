import { useNavigate } from "react-router-dom";
function Picture(props) {
  const navigate = useNavigate();
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
          <i
            onClick={handleOnSelect}
            className="fas fa-edit fa-sm"
            style={{ cursor: "pointer" }}
          ></i>
          {" " + props.name + " "}
          <i
            className="fas fa-trash fa-sm"
            onClick={deleteHandler}
            style={{ cursor: "pointer" }}
          ></i>
        </h1>
        <br />
      </div>

      <div className="container justify-content-center align-items-center">
        <img src={props.url} className="img-fluid mx-auto d-block" alt="..." />
      </div>
    </>
  );
}
export default Picture;
