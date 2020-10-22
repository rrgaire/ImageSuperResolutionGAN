import React from "react";
import { useContext } from "react";
import Dropdown from "react-dropdown";
import "./modelSelectDropdown.css";
import FileContext from "../context/fileContext";

const ModelSelect = () => {
  const context = useContext(FileContext);
  const options = ["Generic Model", "Face Model", "Medical Model"];
  const defaultOption = options[0];
  return (
    <div className="model-select">
      <Dropdown
        className="modelSelect"
        options={options}
        onChange={(val) => context.selectModelType(val["value"])}
        value={defaultOption}
        placeholder="Select an option"
      />
    </div>
  );
};

export default ModelSelect;
