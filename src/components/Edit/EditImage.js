import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import useHttp from "../../hooks/use-http";

const options = [
  {
    label: "Nature",
    value: "Nature photography",
  },
  {
    label: "Landscape",
    value: "Landscape photography",
  },
  {
    label: "Astrophotography",
    value: "Astrophotography",
  },
  {
    label: "Storm",
    value: "Storm photography",
  },
  {
    label: "Pet",
    value: "Pet photography",
  },
  {
    label: "Macro",
    value: "Macro photography",
  },
  {
    label: "Flower",
    value: "Flower photography",
  },
  {
    label: "Architecture",
    value: "Architecture photography",
  },
  {
    label: "Real",
    value: "Real estate photography",
  },
  {
    label: "Drone",
    value: "Drone photography",
  },
  {
    label: "Aerial",
    value: "Aerial photography",
  },
  {
    label: "Portrait",
    value: "Portrait photography",
  },
  {
    label: "Headshot",
    value: "Headshot photography",
  },
  {
    label: "Fashion",
    value: "Fashion photography",
  },
  {
    label: "Sports",
    value: "Sports photography",
  },
  {
    label: "Documentary",
    value: "Documentary photography",
  },
  {
    label: "Street",
    value: "Street photography",
  },
  {
    label: "Wedding",
    value: "Wedding photography",
  },
  {
    label: "Food",
    value: "Food photography",
  },
  {
    label: "Product",
    value: "Product photography",
  },
  {
    label: "StillLife",
    value: "Still life photography",
  },
  {
    label: "BlackAndWhite",
    value: "Black-and-white photography",
  },
  {
    label: "FineArt",
    value: "Fine art photography",
  },
  {
    label: "DoubleExposure",
    value: "Double exposure photography",
  },
  {
    label: "Surreal",
    value: "Surreal photography",
  },
  {
    label: "Abstract",
    value: "Abstract photography",
  },
];

const EditImage = (props) => {
  /*
 {
    label: "Nature",
    value: "Nature photography",
  },
*/
  const navigate = useNavigate();

  const imageIdObj = useParams();
  const imageId = imageIdObj[Object.keys(imageIdObj)[0]];

  const [picture, setPicture] = useState();
  const [selectedOption, setSelectedOption] = useState();

  const { sendRequest: fetchPictures } = useHttp();

  useEffect(() => {
    const transformPictures = (picturesObj) => {
      let loadedPicture;

      for (const key in picturesObj) {
        if (key === imageId) {
          loadedPicture = {
            id: key,
            name: picturesObj[key].name,
            url: picturesObj[key].url,
            category: picturesObj[key].category,
            creatorId: picturesObj[key].creatorId,
          };

          const category = {
            label: loadedPicture.category.split(" ")[0],
            value: loadedPicture.category,
          };
          setSelectedOption(category);
          break;
        }
      }
      setPicture(loadedPicture);
    };

    fetchPictures(
      {
        url: "https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures.json",
      },
      transformPictures
    );
  }, [fetchPictures, imageId]);

  const nameInputRef = useRef();
  const urlInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    if (selectedOption) {
      const enteredName = nameInputRef.current.value;
      const enteredUrl = urlInputRef.current.value;

      const userId = localStorage.getItem("userId");

      const imageData = {
        category: selectedOption.value,
        name: enteredName,
        url: enteredUrl,
        creatorId: userId,
      };

      props.onChangeImage(imageData, imageId);
      navigate("/");
    } else {
      alert("Please, select a category");
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="container p-5">
        <h2 className="fw-bold mb-5 mx-auto text-center">Edit your image</h2>
        {picture && (
          <>
            <div className="mb-3">
              <label htmlFor="imageFormName" className="form-value">
                Image Name
              </label>
              <input
                type="text"
                className="form-control"
                id="imageFormName"
                placeholder="Loading..."
                ref={nameInputRef}
                defaultValue={picture.name}
              />
            </div>
            <label className="form-value">Category</label>
            <div className="input-group mb-3">
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
            </div>
            <label className="form-value">Image URL</label>
            <input
              type="text"
              className="form-control"
              id="imageFormURL"
              placeholder="Loading..."
              ref={urlInputRef}
              defaultValue={picture.url}
            />
            {/*
        <div className="input-group mb-3">
          <input type="file" className="form-control" id="inputGroupFile02" />
          <label className="input-group-text" htmlFor="inputGroupFile02">
            Upload
          </label>
        </div>
        */}
            <br />
            <button type="submit" className="btn btn-success px-4 ">
              Edit
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default EditImage;
