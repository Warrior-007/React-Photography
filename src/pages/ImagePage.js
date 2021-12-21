import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useHttp from "../hooks/use-http";
import Picture from "../components/AllPictures/Picture";

const ImagePage = () => {
  const [pictures, setPictures] = useState([]);

  const imageIdObj = useParams();
  const imageId = imageIdObj[Object.keys(imageIdObj)[0]];

  const { isLoading, sendRequest: fetchPictures } = useHttp();

  useEffect(() => {
    const transformPictures = (picturesObj) => {
      const loadedPictures = [];

      for (const key in picturesObj) {
        if (key === imageId) {
          loadedPictures.push({
            id: key,
            name: picturesObj[key].name,
            url: picturesObj[key].url,
            category: picturesObj[key].category,
            creatorId: picturesObj[key].creatorId,
          });
          break;
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
  }, [fetchPictures, imageId]);

  const picture = pictures.map((picture) => (
    <Picture
      isLoading={isLoading}
      key={picture.id}
      id={picture.id}
      name={picture.name}
      url={picture.url}
      category={picture.category}
    />
  ));
  return (
    <>
      <div className="album py-5 bg-light">
        <div className="container">{picture}</div>
      </div>
    </>
  );
};
export default ImagePage;
