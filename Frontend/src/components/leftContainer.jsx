import React from "react";
import PreviewImage from "./previewImage";
import ControlImageList from "./controlImageList";

const LeftContainer = ({
  // loading,
  // onSelectAll,
  // allSelected,
  files,
  original,
  onClearAll,
  onSelectOne,
  onDelete,
  onServerUpload,
  upscaled
}) => (
  <div className="left-container">
    <PreviewImage original={original} upscaled={upscaled} />
    <ControlImageList
      // allSelected={allSelected}
      // onSelectAll={onSelectAll}
      files={files}
      onClearAll={onClearAll}
      onSelectOne={onSelectOne}
      onDelete={onDelete}
      onServerUpload={onServerUpload}
    />
  </div>
);
export default LeftContainer;