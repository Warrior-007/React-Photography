import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PicturePreview from "../components/AllPictures/PicturePreview";
import AlbumInformation from "../components/AllPictures/AlbumInfrormation";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const AlbumPage = () => {
  const [pictures, setPictures] = useState([]);
  const categoryObj = useParams();
  const category = categoryObj[Object.keys(categoryObj)[0]];

  useEffect(() => {
    const fetchPictures = async () => {
      const response = await fetch(
        "https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures.json"
      );
      const responseData = await response.json();

      const loadedPictures = [];


      for (const key in responseData) {
        if (responseData[key].category === category) {
          loadedPictures.push({
            key: key,
            id: key,
            name: responseData[key].name,
            url: responseData[key].url,
            category: responseData[key].category,
          });
        }
      }

      setPictures(loadedPictures);
    };
    fetchPictures();
  }, [category]);


  const picturesList = pictures.map((picture) => (
    <Zoom>
      <PicturePreview
        key={picture.id}
        id={picture.id}
        name={picture.name}
        url={picture.url}
        category={picture.category}
      />
    </Zoom>
  ));
  return (
    <>
      <AlbumInformation name={category}/>

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
