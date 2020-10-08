import React from "react";
import SelectAllBar from "./selectAllBar";
import ListImage from "./listImage";
const ControlImageList = ({
  files,
  onClearAll,
  onSelectAll,
  onSelectOne,
  allSelected,
  onDelete,
  onServerUpload,
}) => {
  return (
    <div className="image-control-box">
      <SelectAllBar
        onClearAll={onClearAll}
        onSelectAll={onSelectAll}
        allSelected={allSelected}
      />
      <ListImage
        files={files}
        onSelectOne={onSelectOne}
        onDelete={onDelete}
        onServerUpload={onServerUpload}
      />
    </div>
  );
};

export default ControlImageList;
