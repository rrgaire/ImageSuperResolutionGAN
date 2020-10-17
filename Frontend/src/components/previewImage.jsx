import React from "react";
import Loader from "./loader";

const PreviewImage = ({ original, upscaled }) => {
  return (
    <div className="image-preview-box">
      <div className="image-container-wrapper">
        <div className="image-container">
          <img src={original} alt="Your Img" />
        </div>
      </div>
      <div className="image-container-wrapper">
        {upscaled && (
          <div className="image-container">
            <img src={`data:image/jpeg;base64,${upscaled}`} alt="" />
          </div>
        )}

        {!upscaled && <Loader />}
      </div>
    </div>
  );
};
export default PreviewImage;
