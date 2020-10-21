import React, { useContext } from "react";
import Loader from "./loader";

import FileContext from "../context/fileContext";

const PreviewImage = () => {
  const context = useContext(FileContext);
  const fileUrl = context.selectedFile.url;
  const upscaledData = context.selectedFile.upscaledData;
  const isFileUpscaled = upscaledData !== "";
  return (
    <div className="image-preview-box">
      <div className="image-container-wrapper">
        <div className="image-container">
          <img src={fileUrl} alt="Your Img" />
        </div>
      </div>
      <div className="image-container-wrapper">
        {isFileUpscaled && (
          <div className="image-container">
            <img src={`data:image/jpeg;base64,${upscaledData}`} alt="" />
          </div>
        )}

        {!isFileUpscaled && <Loader />}
      </div>
    </div>
  );
};
export default PreviewImage;
