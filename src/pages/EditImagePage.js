import EditImage from "../components/Edit/EditImage";

const EditImagePage = () => {
  function editImageHandler(imageData, imageId) {
    fetch(
      `https://react-photography-default-rtdb.europe-west1.firebasedatabase.app/pictures/${imageId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(imageData),
        header: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return <EditImage onChangeImage={editImageHandler} />;
};

export default EditImagePage;
