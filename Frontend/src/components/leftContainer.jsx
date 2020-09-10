import React from "react";
import { ClockLoader } from "react-spinners";
import PreviewImage from "./previewImage";
import ControlImageList from "./controlImageList";

const LeftContainer = ({files, original, loading}) => (
  <div className="col m-0 p-0">
    <PreviewImage original={original} loading={loading}/>
    <ControlImageList files={files}/>
  </div>
);

export default LeftContainer;
