import UploadImage from "../components/Upload/UploadImage";

const UploadImagePage = () => {
  function addImageHandler(imageData) {
    console.log(imageData);
    fetch(
      "https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures.json",
      {
        method: "POST",
        body: JSON.stringify(imageData),
        header: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return <UploadImage onAddImage={addImageHandler} />;
};

export default UploadImagePage;
