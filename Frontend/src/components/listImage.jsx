import React, { useContext } from "react";

import FileContext from "../context/fileContext";

const ListImage = () => {
  const context = useContext(FileContext);
  const allFiles = context.getAllFiles();
  const disableButton = context.getLoadingState();
  return (
    <div className="image-list-box">
      {allFiles.map((f) => (
        <div key={f.name} className="image-detail-box">
          <div
            className="two-cols-inside-detail-box image-select"
            onClick={() => context.selectFile(f)}>
            {/* <input
              type="checkbox"
              name="select-one"
              id="select-one"
              className="ckbox"
              checked={f.checked}
              onChange={() => onSelectOne(f)}
            /> */}
            <div className="list-box-inner">
              <p className="m-0">Name: {f.name}</p>
              <p className="m-0">Size: {f.size}</p>
            </div>
          </div>
          <div className="two-cols-inside-detail-box">
            <button
              disabled={disableButton}
              type="button"
              className="scale-button"
              onClick={() => context.uploadFileToServer(f)}>
              Scale
            </button>
            <div className="list-box-inner">
              <p className="m-0">Factor(x): </p>
              <p className="m-0">Size: </p>
            </div>
          </div>
          <div className="remove-image-button-wrap">
            <button
              disabled={disableButton}
              type="button"
              className="remove-image-button"
              onClick={() => context.deleteFile(f)}>
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ListImage;
