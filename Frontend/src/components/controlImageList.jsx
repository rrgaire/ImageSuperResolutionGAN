import React from "react";
import SelectAllBar from "./selectAllBar";
import ListImage from './listImage';
const ControlImageList = ({ files}) => {
  return (
    <div className="row m-0 list-preview ram">
      <div className="col m-0 p-0">
        <SelectAllBar />
        <ListImage files={files}/>
      </div>
    </div>
  );
};

export default ControlImageList;
