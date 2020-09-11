import React from 'react';

const SelectAllBar = ({ onClearAll, onSelectAll, allSelected }) => {
  return (
    <div className="select-all-box">
      <div className="check-box-content">
        <input
          type="checkbox"
          name="select-all"
          id="select-all"
          className="ckbox"
          checked={allSelected}
          onChange={onSelectAll}
        />
        <label htmlFor="select-all" style={{ marginBottom: 0 }}>
          Select All
        </label>
      </div>
      <div>
        <button
          type="button"
          className="clear-images-button"
          onClick={onClearAll}>
          Clear All Images
        </button>
      </div>
    </div>
  );
};
 
export default SelectAllBar;