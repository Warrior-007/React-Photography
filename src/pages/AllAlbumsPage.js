import PicturePreview from "../components/AllPictures/PicturePreview";

  const AllAlbumsPage = () => {
      return (
    <>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <PicturePreview /> 
            <PicturePreview />
            <PicturePreview />
          </div>
        </div>
      </div>
    </>
  );
}
export default AllAlbumsPage;
