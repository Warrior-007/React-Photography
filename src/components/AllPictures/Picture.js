
function Picture(props) {
  return (
    <>
      <div className="container justify-content-center image-name">
        <h1>{props.name}</h1>
        <br/> 
      </div>
      
      <div className="container justify-content-center align-items-center">
        <img src={props.url} className="img-fluid mx-auto d-block" alt="..." />
        </div>
    </>
  );
}
export default Picture;
