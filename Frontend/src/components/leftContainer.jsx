import React from "react";
import { ClockLoader } from "react-spinners";
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
}) => (
  <div className="">
    <PreviewImage original={original} loading={loading} />
    <ControlImageList
      files={files}
      allSelected={allSelected}
      onClearAll={onClearAll}
      onSelectAll={onSelectAll}
      onSelectOne={onSelectOne}
      onDelete={onDelete}
    />
  </div>
);

export default LeftContainer;
