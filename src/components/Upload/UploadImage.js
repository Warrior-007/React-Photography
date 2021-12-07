import { useRef } from "react";
import Options from "./Categories";

function UploadImage() {
  const nameInputRef = useRef();
  const urlInputRef = useRef();
  function submitHandler(event) {
    event.preventDefault();
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
          <Options />
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
        <button type="button" className="btn btn-primary px-4 ">
          Upload
        </button>
      </div>
    </form>
  );
}

export default UploadImage;
