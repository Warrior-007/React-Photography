function PicturePreview(props) {
  const userId = localStorage.getItem("userId");
  const imageCreatorId = props.creatorId;
  let isUserTheOwner = false;
  if (userId === imageCreatorId) {
    isUserTheOwner = true;
  }

  return (
    <div
      className="col"
      id={props.id}
      category={props.name}
      onClick={props.onClick}
    >
      <div className="card">
        <img className="card-img-top" src={props.url} alt="" />
        <div className="card-body row">
          <div className="container col-6">
            <p className="card-text">{props.name}</p>
          </div>
          {isUserTheOwner && (
            <>
              <div className="container  col-3">
                {" "}
                <i className="fas fa-edit float-left"></i>
              </div>
              <div className="container  col-3">
                <i className="fas fa-trash float-right"></i>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default PicturePreview;
