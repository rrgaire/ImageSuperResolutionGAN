import React, { useContext } from "react";
import ReactImageMagnify from "react-image-magnify";
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
          {/* <img src={fileUrl} alt="Your Img" /> */}
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                isFluidWidth: true,
                src: fileUrl,
              },
              largeImage: {
                src: fileUrl,
                width: 1200,
                height: 1800,
              },
              enlargedImagePosition: "over",
            }}
          />
        </div>
      </div>
      <div className="image-container-wrapper">
      <div className="image-container">
        {isFileUpscaled && (
          <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Wristwatch by Ted Baker London",
              isFluidWidth: true,
              src: `data:image/jpeg;base64,${upscaledData}`,
            },
            largeImage: {
              src: `data:image/jpeg;base64,${upscaledData}`,
              width: 1200,
              height: 1800,
            },
            enlargedImagePosition: "over",
          }}
        />
            // <img src={`data:image/jpeg;base64,${upscaledData}`} alt="" />
          
        )}
        </div>

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
