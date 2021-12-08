import { useRef, useState } from "react";
import Select from "react-select";

const options = [
  {
    value: "Nature",
    label: "Nature photography",
  },
  {
    value: "Landscape",
    label: "Landscape photography",
  },
  {
    value: "Astrophotography",
    label: "Astrophotography",
  },
  {
    value: "Storm",
    label: "Storm photography",
  },
  {
    value: "Pet",
    label: "Pet photography",
  },
  {
    value: "Macro",
    label: "Macro photography",
  },
  {
    value: "Flower",
    label: "Flower photography",
  },
  {
    value: "Architecture",
    label: "Architecture photography",
  },
  {
    value: "Real",
    label: "Real estate photography",
  },
  {
    value: "Drone",
    label: "Drone photography",
  },
  {
    value: "Aerial",
    label: "Aerial photography",
  },
  {
    value: "Portrait",
    label: "Portrait photography",
  },
  {
    value: "Headshot",
    label: "Headshot photography",
  },
  {
    value: "Fashion",
    label: "Fashion photography",
  },
  {
    value: "Sports",
    label: "Sports photography",
  },
  {
    value: "Documentary",
    label: "Documentary photography",
  },
  {
    value: "Street",
    label: "Street photography",
  },
  {
    value: "Wedding",
    label: "Wedding photography",
  },
  {
    value: "Food",
    label: "Food photography",
  },
  {
    value: "Product",
    label: "Product photography",
  },
  {
    value: "StillLife",
    label: "Still life photography",
  },
  {
    value: "BlackAndWhite",
    label: "Black-and-white photography",
  },
  {
    value: "FineArt",
    label: "Fine art photography",
  },
  {
    value: "DoubleExposure",
    label: "Double exposure photography",
  },
  {
    value: "Surreal",
    label: "Surreal photography",
  },
  {
    value: "Abstract",
    label: "Abstract photography",
  },
];

function UploadImage(props) {
  const nameInputRef = useRef();
  const urlInputRef = useRef();
  const [selectedOption, setSelectedOption] = useState(null);

  function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredUrl = urlInputRef.current.value;
    const imageData = {
      category: selectedOption.value,
      name: enteredName,
      url: enteredUrl,
    };

    props.onAddImage(imageData)
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="container p-5">
        <h2 className="fw-bold mb-5 mx-auto">Upload your image HERE</h2>

        <div className="mb-3">
          <label htmlFor="imageFormName" className="form-label">
            Image Name
          </label>
          <input
            type="text"
            className="form-control"
            id="imageFormName"
            placeholder="African lion"
            ref={nameInputRef}
          />
        </div>
        <label className="form-label">Category</label>
        <div className="input-group mb-3">
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
          {/* 
          <select className="form-select" aria-label="Category select">
            <option value="Nature">Nature photography</option>
            <option value="Landscape">Landscape photography</option>
            <option value="Astrophotography">Astrophotography</option>
            <option value="Storm">Storm photography</option>
            <option value="Pet">Pet photography</option>
            <option value="Macro">Macro photography</option>
            <option value="Flower">Flower photography</option>
            <option value="Architecture">Architecture photography</option>
            <option value="Real">Real estate photography</option>
            <option value="Drone">Drone photography</option>
            <option value="Aerial">Aerial photography</option>
            <option value="Portrait">Portrait photography</option>
            <option value="Headshot">Headshot photography</option>
            <option value="Fashion">Fashion photography</option>
            <option value="Sports">Sports photography</option>
            <option value="Documentary">Documentary photography</option>
            <option value="Street">Street photography</option>
            <option value="Wedding">Wedding photography</option>
            <option value="Food">Food photography</option>
            <option value="Product">Product photography</option>
            <option value="StillLife">Still life photography</option>
            <option value="BlackAndWhite">Black-and-white photography</option>
            <option value="FineArt">Fine art photography</option>
            <option value="DoubleExposure">Double exposure photography</option>
            <option value="Surreal">Surreal photography</option>
            <option value="Abstract">Abstract photography</option>
          </select>
          */}
        </div>
        <label className="form-label">Image URL</label>
        <input
          type="text"
          className="form-control"
          id="imageFormURL"
          placeholder="https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg"
          ref={urlInputRef}
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
        <button type="submit" className="btn btn-primary px-4 ">
          Upload
        </button>
      </div>
    </form>
  );
}

export default UploadImage;
