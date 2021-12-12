function AlbumInformation (props){
    return (
                
  <section className="py-5 text-center container">
  <div className="row py-lg-5">
    <div className="col-lg-6 col-md-8 mx-auto">
      <h1 className="fw-light">{props.name}</h1>
      <p className="lead text-muted">props.description</p>
      <p>
        <a href="/" className="btn btn-primary my-2">Main call to action</a>
        <a href="/" className="btn btn-secondary my-2">Secondary action</a>
      </p>
    </div>
  </div>
</section>
    );
}
export default AlbumInformation;