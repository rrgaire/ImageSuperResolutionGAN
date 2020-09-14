import React from "react";

const ListImage = ({ files, onSelectOne, onDelete, onServerUpload }) => {
  return (
    <div>
      {files.map((f) => (
        <div key={f.name} className="image-detail-box">
          <div className="two-cols-inside-detail-box">
            <input
              type="checkbox"
              name="select-one"
              id="select-one"
              className="ckbox"
              checked={f.checked}
              onChange={() => onSelectOne(f)}
            />
            <div className="list-box-inner">
              <p className="m-0">Name: {f.name}</p>
              <p className="m-0">Size: {f.size}</p>
            </div>
          </div>
          <div className="two-cols-inside-detail-box">
            <button
              type="button"
              className="scale-button"
              onClick={() => onServerUpload(f)}>
              Scale
            </button>
            <div className="list-box-inner">
              <p className="m-0">Factor(x): </p>
              <p className="m-0">Size: </p>
            </div>
          </div>
          <div className="remove-image-button-wrap">
            <button
              type="button"
              className="remove-image-button"
              onClick={() => onDelete(f)}>
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListImage;
