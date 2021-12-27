import { useEffect, useState } from "react";
import PicturePreview from "../components/AllPictures/PicturePreview";
import useHttp from "../hooks/use-http";
const MyImagesPage = () => {
  const [pictures, setPictures] = useState([]);

  const { isLoading, sendRequest: fetchPictures } = useHttp();
  useEffect(() => {
    const transformPictures = (picturesObj) => {
      const loadedPictures = [];
      const userId = localStorage.getItem("userId");

      for (const key in picturesObj) {
        if (picturesObj[key].creatorId === userId) {
          loadedPictures.push({
            id: key,
            name: picturesObj[key].name,
            url: picturesObj[key].url,
            category: picturesObj[key].category,
            creatorId: picturesObj[key].creatorId,

            likes: picturesObj[key].likes,
            dislikes: picturesObj[key].dislikes,
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
  }, [fetchPictures]);

  const reversed = pictures.reverse();
  const picturesList = reversed.map((picture) => (
    <PicturePreview
      isLoading={isLoading}
      link={`/image-information/${picture.id}`}
      key={picture.id}
      id={picture.id}
      name={picture.name}
      url={picture.url}
      category={picture.category}
      creatorId={picture.creatorId}
      likes={picture.likes}
      dislikes={picture.dislikes}
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
export default MyImagesPage;
