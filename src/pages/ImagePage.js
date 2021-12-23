import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useHttp from "../hooks/use-http";
import Picture from "../components/AllPictures/Picture";

const ImagePage = () => {
  const [picture, setPicture] = useState([]);

  const imageIdObj = useParams();
  const imageId = imageIdObj[Object.keys(imageIdObj)[0]];

  const { isLoading, sendRequest: fetchPictures } = useHttp();
  useEffect(() => {
    const transformPictures = (picturesObj) => {
      let loadedPicture = {
        id: imageId,
        name: picturesObj.name,
        url: picturesObj.url,
        category: picturesObj.category,
        creatorId: picturesObj.creatorId,
      };

      setPicture(loadedPicture);
    };

    fetchPictures(
      {
        url: `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${imageId}.json`,
      },
      transformPictures
    );
  }, [fetchPictures, imageId]);

  return (
    <>
      <div className="album py-5 bg-light">
        <div className="container">
          <Picture
            isLoading={isLoading}
            key={picture.id}
            id={picture.id}
            name={picture.name}
            url={picture.url}
            category={picture.category}
            creatorId={picture.creatorId}
          />
        </div>
      </div>
    </>
  );
};
export default ImagePage;
