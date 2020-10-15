import React from "react";
import PreviewImage from "./previewImage";
import ControlImageList from "./controlImageList";

const LeftContainer = ({
  files,
  original,
  loading,
  onClearAll,
  onSelectAll,
  onSelectOne,
  allSelected,
  onDelete,
  onServerUpload,
  upscaled
}) => (
  <div className="left-container">
    <PreviewImage original={original} upscaled={upscaled} loading={loading} />
    <ControlImageList
      files={files}
      allSelected={allSelected}
      onClearAll={onClearAll}
      onSelectAll={onSelectAll}
      onSelectOne={onSelectOne}
      onDelete={onDelete}
      onServerUpload={onServerUpload}
    />
  </div>
);

export default LeftContainer;
