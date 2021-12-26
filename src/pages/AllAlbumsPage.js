import { useEffect, useState } from "react";
import PicturePreview from "../components/AllPictures/PicturePreview";
import useHttp from "../hooks/use-http";

const AllAlbumsPage = () => {
  const [album, setAlbum] = useState([]);
  const { isLoading, sendRequest: fetchPictures } = useHttp();

  useEffect(() => {
    const transformAlbum = (picturesObj) => {
      const loadedAlbums = [];

      for (const key in picturesObj) {
        if (
          loadedAlbums.find(
            (product) => product.category === picturesObj[key].category
          )
        ) {
          continue;
        }
        loadedAlbums.push({
          id: key,
          url: picturesObj[key].url,
          category: picturesObj[key].category,
          isThisCategory: true
        });
      }
      setAlbum(loadedAlbums);
    };
    fetchPictures(
      {
        url: "https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures.json",
      },
      transformAlbum
    );
  }, [fetchPictures]);

  const categoryList = album.map((picture) => (
    <PicturePreview
      isLoading={isLoading}
      link={`/album-information/${picture.category}`}
      key={picture.category}
      id={picture.id}
      url={picture.url}
      name={picture.category}
      isThisCategory={picture.isThisCategory}
    />
  ));

  return (
    <>
      <div className="album py-5 bg-light">
      <div className="container justify-content-center image-name">
        <h1 className="mb-5">Categories
        </h1>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {categoryList}
          </div>
        </div>
      </div>
    </>
  );
};
export default AllAlbumsPage;
