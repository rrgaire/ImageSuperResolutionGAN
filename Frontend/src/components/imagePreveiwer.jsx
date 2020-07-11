import React from "react";

const ImagePreviewer = ({ fileArray, onImageClick }) => {
  return (
    <div className="preview-container">
      {fileArray.map((file) => (
        <div
          key={file.name}
          className="preview-card"
          style={{ backgroundImage: `url(${file.url})`, cursor: "pointer" }}
          onClick={()=>onImageClick(file.name)}
        />
      ))}
    </div>
  );
};

export default ImagePreviewer;
