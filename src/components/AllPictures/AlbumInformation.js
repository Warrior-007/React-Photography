function AlbumInformation (props){
    return (
                
  <section className="py-5 text-center container">
  <div className="row py-lg-5">
    <div className="col-lg-6 col-md-8 mx-auto">
      <h1 className="text-warning">{props.name}</h1>
    </div>
  </div>
</section>
    );
}
export default AlbumInformation;