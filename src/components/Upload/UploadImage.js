function UploadImage() {
  return (
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
        />
      </div>
      <label className="form-label">Category</label>
      <div className="input-group mb-3">
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
      </div>
      <br />
      <div className="input-group mb-3">
        <input type="file" className="form-control" id="inputGroupFile02" />
        <label className="input-group-text" htmlFor="inputGroupFile02">
          Upload
        </label>
      </div>
    </div>
  );
}

export default UploadImage;
