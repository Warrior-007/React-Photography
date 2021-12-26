import { useEffect, useState } from "react";
import PicturePreview from "../components/AllPictures/PicturePreview";
import useHttp from "../hooks/use-http";

const AllPictures = () => {
  const [pictures, setPictures] = useState([]);
  const { isLoading, sendRequest: fetchPictures } = useHttp();

  useEffect(() => {
    const transformPictures = (picturesObj) => {
      const loadedPictures = [];

      for (const key in picturesObj) {
        loadedPictures.push({
          id: key,
          name: picturesObj[key].name,
          url: picturesObj[key].url,
          category: picturesObj[key].category,
          creatorId: picturesObj[key].creatorId,
          likes: picturesObj[key].likes,
          dislikes: picturesObj[key].dislikes,
          isThisCategory: false
        });
      }
      setPictures(loadedPictures);
    };

    fetchPictures(
      {
        url: "https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures.json",
      },
      transformPictures
    );
  }, [fetchPictures]);

  const picturesList = pictures
    .reverse()
    .map((picture) => (
      <PicturePreview
        isLoading={isLoading}
        link={`/image-information/${picture.id}`}
        key={picture.id}
        id={picture.id}
        name={picture.name}
        url={picture.url}
        category={picture.category}
        creatorId={picture.creatorId}
        likes = {picture.likes}
        dislikes = {picture.dislikes}
      />
    ));

  return (
    <>
      <div className="album py-5 bg-light">
        <div className="container justify-content-center image-name">
          <h1 className="mb-5">All Images</h1>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {picturesList}
          </div>
        </div>
      </div>
    </>
  );
};
export default AllPictures;
