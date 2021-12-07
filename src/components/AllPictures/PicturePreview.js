function PicturePreview(props) {
  return (
    <div className="col">
      <div className="card">
        <img className="card-img-top" src={props.url} alt=""/>
        <div className="card-body">
          <p className="card-text">{props.name}</p>
        </div>
      </div>
    </div>
  );
}
export default PicturePreview;
