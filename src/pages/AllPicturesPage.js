import { useEffect, useState } from "react";
import PicturePreview from "../components/AllPictures/PicturePreview";

const AllPictures = () => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchPictures = async () => {
      const response = await fetch(
        "https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures.json"
      );
      const responseData = await response.json();

      const loadedPictures = [];

      for (const key in responseData) {
        loadedPictures.push({
          id: key,
          name: responseData[key].name,
          url: responseData[key].url,
          category: responseData[key].category,
        });
      }

      setPictures(loadedPictures);
    };
    fetchPictures();
  }, []);
  const picturesList = pictures.map((picture) => (
    <PicturePreview
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
          <div className="row row-cols- row-cols-sm-2 row-cols-md-3 g-3">
            {picturesList}
          </div>
        </div>
      </div>
    </>
  );
};
export default AllPictures;
