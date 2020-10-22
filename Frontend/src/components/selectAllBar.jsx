import React, { useContext } from "react";

import FileContext from "../context/fileContext";

const SelectAllBar = () => {
  const context = useContext(FileContext);
  return (
    <div className="select-all-box">
      <div className="check-box-content">
        <h3>Image List</h3>
        {/* <input
          type="checkbox"
          name="select-all"
          id="select-all"
          className="ckbox"
          checked={allSelected}
          onChange={onSelectAll}
        />
        <label htmlFor="select-all" style={{ marginBottom: 0 }}>
          Select All
        </label> */}
      </div>

      <div>
        <label
          style={{ color: "#1fb149", cursor: "pointer" }}
          htmlFor="imageUpload">
          Add More
        </label>

        <input
          type="file"
          multiple
          accept="image/jpeg, image/png"
          style={{ display: "none" }}
          id="imageUpload"
          onChange={context.uploadFiles}
        />
      </div>

      <div>
        <button
          type="button"
          className="clear-images-button"
          onClick={context.removeFiles}>
          Clear All Images
        </button>
      </div>
    </div>
  );
};

export default SelectAllBar;
