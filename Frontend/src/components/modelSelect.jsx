import React from "react";
import Dropdown from 'react-dropdown';
import './modelSelectDropdown.css';

const ModelSelect = ({onModelTypeSelect}) => {



  const options = [
    'Generic Model', 'Face Model', 'Medical Model'
  ];
  const defaultOption = options[0];
  return (
    <div className="model-select">

        <Dropdown className='modelSelect' options={options}  onChange={(val) => onModelTypeSelect(val['value'])} value={defaultOption} placeholder="Select an option" />
    </div>
  );
};

export default ModelSelect;
