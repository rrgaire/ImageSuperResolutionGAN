import React, { useContext } from "react";
import FileContext from "../context/fileContext";
const ImageUploader = () => {
  const context = useContext(FileContext);
  return (
    <div className="card-sr">
      <div className="image-uploader">
        <div>
          <i className="far fa-image fa-3x" style={{ height: "100%" }}></i>
        </div>
        <div className="header3">
          <label
            style={{ color: "#1fb149", cursor: "pointer" }}
            htmlFor="imageUpload">
            Browse
          </label>{" "}
          Images
        </div>
        <input
          type="file"
          multiple
          accept="image/jpeg, image/png"
          style={{ display: "none" }}
          id="imageUpload"
          onChange={context.uploadFiles}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
