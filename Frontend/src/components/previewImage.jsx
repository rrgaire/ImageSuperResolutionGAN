import React from "react";
import Loader from './loader'

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
        {upscaled && (<div className="image-container">
          <img src={`data:image/jpeg;base64,${upscaled}`}/>
        </div>)}

        {!upscaled && <Loader />}
      </div>
    </div>
  );
};

export default PreviewImage;
