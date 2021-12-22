import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PicturePreview from "../components/AllPictures/PicturePreview";
import AlbumInformation from "../components/AllPictures/AlbumInfrormation";

import useHttp from "../hooks/use-http";

const AlbumPage = () => {
  const [pictures, setPictures] = useState([]);
  const categoryObj = useParams();
  const category = categoryObj[Object.keys(categoryObj)[0]];

  const { isLoading, sendRequest: fetchPictures } = useHttp();
  useEffect(() => {
    const transformPictures = (picturesObj) => {
      const loadedPictures = [];

      for (const key in picturesObj) {
        if (picturesObj[key].category === category) {
          loadedPictures.push({
            id: key,
            name: picturesObj[key].name,
            url: picturesObj[key].url,
            category: picturesObj[key].category,
            creatorId: picturesObj[key].creatorId,
          });
        }
      }

      setPictures(loadedPictures);
    };
    fetchPictures(
      {
        url: "https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures.json",
      },
      transformPictures
    );
  }, [fetchPictures, category]);

  const picturesList = pictures.map((picture) => (

      <PicturePreview
        isLoading={isLoading}
        link={`/image-information/${picture.id}`}
        key={picture.id}
        id={picture.id}
        name={picture.name}
        url={picture.url}
        category={picture.category}
        creatorId={picture.creatorId}
      />
  ));
  return (
    <>
      <AlbumInformation name={category} />

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {picturesList}
          </div>
        </div>
      </div>
    </>
  );
};
export default AlbumPage;
