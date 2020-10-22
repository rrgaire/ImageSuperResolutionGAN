import React, { useContext } from "react";
import Loader from "./loader";

import FileContext from "../context/fileContext";

const PreviewImage = () => {
  const context = useContext(FileContext);
  const selectedFile = context.getSelectedFile();
  const fileUrl = selectedFile.url;
  const upscaledData = selectedFile.upscaledData;
  const isFileUpscaled = upscaledData !== "";
  const isLoading = context.getLoadingState();
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

        {!isFileUpscaled && isLoading && <Loader />}

        {!isFileUpscaled && !isLoading && (
          <div style={{ textAlign: "center" }}>
            <h2>{context.getMessage()}</h2>
          </div>
        )}
      </div>
    </div>
  );
};
export default PreviewImage;
