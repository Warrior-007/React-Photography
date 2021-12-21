import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

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

function UploadImage(props) {
  const navigate = useNavigate();

  const nameInputRef = useRef();
  const urlInputRef = useRef();
  const [selectedOption, setSelectedOption] = useState(null);

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

      props.onAddImage(imageData);
      navigate("/");
    } else {
      alert("Please, select a category");
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="container p-5">
        <h2 className="fw-bold mb-5 mx-auto text-center">
          Upload your image HERE
        </h2>

        <div className="mb-3">
          <label htmlFor="imageFormName" className="form-value">
            Image Name
          </label>
          <input
            type="text"
            className="form-control"
            id="imageFormName"
            placeholder="African lion"
            ref={nameInputRef}
            required
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
          placeholder="https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg"
          ref={urlInputRef}
          required
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
          Upload
        </button>
      </div>
    </form>
  );
}

export default UploadImage;
