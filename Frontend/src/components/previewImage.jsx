import React from "react";

const PreviewImage = ({ original, upscaled, loading }) => {
  // console.log(upscaled);
  return (
    <div className="image-preview-box">
      <div className="image-container-wrapper">
        <div className="image-container">
          <img src={original} alt="Your Img" />
        </div>
      </div>
      <div className="image-container-wrapper">
        <div className="image-container">
          <img src={original} alt="Your Img" />
          {/* <img src={`data:image/jpeg;base64,${upscaled}`} alt="Image here" /> */}
        </div>
      </div>
    </div>
  );
};

export default PreviewImage;
