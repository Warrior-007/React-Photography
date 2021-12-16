import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import "react-medium-image-zoom/dist/styles.css";
import Picture from "../components/AllPictures/Picture";

const ImagePage = () => {
  const [pictures, setPictures] = useState([]);

  const imageIdObj = useParams();
  const imageId = imageIdObj[Object.keys(imageIdObj)[0]];

  useEffect(() => {
    const fetchPictures = async () => {
      const response = await fetch(
        "https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures.json"
      );
      const responseData = await response.json();

      const loadedPicture = [];
      for (const key in responseData) {
        if (key === imageId) {
          loadedPicture.push({
            key: key,
            id: key,
            name: responseData[key].name,
            url: responseData[key].url,
            category: responseData[key].category,
          });
          break;
        }
      }

      setPictures(loadedPicture);
    };
    fetchPictures();
  }, [imageId]);

  const picturesList = pictures.map((picture) => (
    
      <Picture
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
        <div className="container">
            {picturesList}
        </div>
      </div>
    </>
  );
};
export default ImagePage;
