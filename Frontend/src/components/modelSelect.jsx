import React from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const ModelSelect = ({onModelTypeSelect}) => {



  const options = [
    'Generic', 'Face', 'Medical'
  ];
  const defaultOption = options[0];
  return (
    <div className="model-select">

        <Dropdown options={options}  onChange={(val) => onModelTypeSelect(val['value'])} value={defaultOption} placeholder="Select an option" />
    </div>
  );
};

export default ModelSelect;
