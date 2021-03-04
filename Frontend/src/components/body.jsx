import React, { useContext, useEffect } from "react";
import LeftContainer from "./leftContainer";
import ImageUploader from "./imageUploader";
import FileContext from "../context/fileContext";
import ModelSelect from "./modelSelect";
import { RightContainer } from "./RightContainer/container/container";

const BodyF = () => {
  const context = useContext(FileContext);
  useEffect(() => {
    console.log(context.getSelectedFile());
  }, [context]);

  return (
    <div className=" section-main ">
      <div className="left ">
        {!context.getSelectedFile() && <ImageUploader />}
        {context.getSelectedFile() && <LeftContainer />}
      </div>

      <div className="right">
        {context.getSelectedFile() && <RightContainer />}
      </div>
    </div>
  );
};

export default BodyF;
