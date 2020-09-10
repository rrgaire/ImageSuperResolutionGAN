import React from "react";

const PreviewImage = ({ original, loading }) => {
  return (
    <div className="row m-0 p-0 image-preview ram">
      <div className="col-6 py-2 px-2 m-0">
        <div className="image-container">
          <img src={original} alt="Your Img" />
        </div>
  
      </div>

      <div className="col-6 py-2 px-2 m-0">
   
        <div className="image-container">
          <img src={original} alt="Your Img" />
        </div>
        {/* {loading && (
          <div className="col-6 loader">
            <ClockLoader size={40} color="#aaa" />
          </div>
        )}
        {!loading && (
          <img
            src={original}
            alt="Your Img"
            style={{ width: "100%", height: "auto" }}
          />
        )} */}
      </div>
    </div>
  );
};

export default PreviewImage;
