import React from "react";
import SelectAllBar from "./selectAllBar";
import ListImage from './listImage';
const ControlImageList = ({
  files,
  onClearAll,
  onSelectAll,
  onSelectOne,
  allSelected,
  onDelete,
}) => {
  return (
    <div className=" ram">
      <SelectAllBar
        onClearAll={onClearAll}
        onSelectAll={onSelectAll}
        allSelected={allSelected}
      />
      <ListImage files={files} onSelectOne={onSelectOne} onDelete={onDelete}/>
    </div>
  );
};

export default ControlImageList;
