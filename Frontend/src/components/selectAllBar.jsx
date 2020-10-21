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
