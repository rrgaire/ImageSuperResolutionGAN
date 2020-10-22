import React, { useContext, useEffect } from "react";
import LeftContainer from "./leftContainer";
import ImageUploader from "./imageUploader";
import FileContext from "../context/fileContext";

const BodyF = () => {
  const context = useContext(FileContext);
  useEffect(() => {
    // console.log(context);
  }, [context]);

  return (
    <div className=" section-main ">
      <div className="left ">
        {!context.getSelectedFile() && <ImageUploader />}
        {context.getSelectedFile() && <LeftContainer />}
      </div>
      <div className="right">Right Container</div>
    </div>
  );
};

export default BodyF;
