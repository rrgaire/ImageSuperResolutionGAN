import React, { Component } from "react";
import axios from "axios";
import { apiUrl } from "../config.json";
import ImageUploader from "./imageUploader";
import LeftContainer from "./leftContainer";
import ModelSelect from "./modelSelect";


class Body extends Component {
  state = {
    // allSelected: false,
    // loading: false,
    // noOfSelected: 0,
    // uploaded: false,
    selected: null,
    previewFiles: [],
  };

  handleDelete = (f) => {
    let files = [...this.state.previewFiles];
    files = files.filter((file) => f !== file);
    console.log(files.length);
    if (files.length === 0) {
      console.log("handle clear all called");
      this.handleClearAll();
      return;
    }

    // let { allSelected, noOfSelected } = this.state;

    // if (f.checked) {
    //   noOfSelected = noOfSelected - 1;
    // }
    // allSelected = noOfSelected === files.length ? true : false;

    this.setState({
      // allSelected,
      // noOfSelected,
      selected: files[0],
      previewFiles: files,
    });
  };

  // handleSelectAll = () => {
  //   let allSelectState = !this.state.allSelected;
  //   let files = [...this.state.previewFiles];
  //   files.map((f) => {
  //     f.checked = allSelectState;
  //     return f;
  //   });
  //   let noOfSelected = allSelectState ? files.length : 0;
  //   this.setState({
  //     previewFiles: files,
  //     allSelected: allSelectState,
  //     noOfSelected,
  //   });
  // };

  handleSelectOne = (f) => {
    let files = [...this.state.previewFiles];
    let file = files.find((file) => file === f);
    // let index = files.indexOf(file);
    // let ff = { ...file };
    // ff.checked = !ff.checked;
    // let noOfSelected = this.state.noOfSelected;
    // noOfSelected = ff.checked ? noOfSelected + 1 : noOfSelected - 1;
    // console.log(noOfSelected);
    // let allSelected = noOfSelected === files.length ? true : false;
    // files[index] = ff;
    this.setState({
      selected: file,
      previewFiles: files,
      // noOfSelected,
      // allSelected,
    });
  };

  handleClearAll = () => {
    this.setState({
      // noOfSelected: 0,
      // allSelected: false,
      // loading: false,
      // uploaded: false,
      selected: null,
      previewFiles: [],
    });
  };

  handleServerUpload = async (selectedFile) => {
    let files = [...this.state.previewFiles];
    let file = files.find((f) => f === selectedFile);
    let fileIndex = files.indexOf(file);
    let f = { ...file };
    this.setState({
      selected: f,
      // loading: true,
    });

    console.log('file', f)
    const form_data = new FormData();
    form_data.append("image", f["file"], f["file"].name, f.modelType);
    console.log(form_data);

    try {
      console.log("connecting............");
      let result = await axios.post(
        apiUrl, form_data,
        {
          headers: {
            "content-type": "multipart/form-data",
            accept: "application/json",
          },
        });
        result = result["data"]["prediction_result"];
        f["upscaled"] = result;
        files[fileIndex] = f;
        this.setState({
          previewFiles: files,
          selected: f,
        });
        console.log("done");
      } catch (ex) {
        console.log("Some error occured!");
        return;
      }
    
  };

  handleImageUpload = async (e) => {
    let files = [];
    let uploadedFiles = e.currentTarget.files;
    let numberOfFiles = uploadedFiles.length;

    for (let i = 0; i < numberOfFiles; i++) {
      let temp = {};

      temp["name"] = `image${i + 1}.${uploadedFiles[i].name.split(".")[1]}`;
      temp["url"] = await URL.createObjectURL(uploadedFiles[i]);
      temp["file"] = uploadedFiles[i];
      temp["modelType"] = 'Generic';
      temp["size"] = uploadedFiles[i].size;
      temp["checked"] = false;

      files.push(temp);
    }
    this.setState({
      previewFiles: [...files],
      uploaded: true,
      // loading: true,
      selected: files[0],
    });
    this.handleServerUpload(files[0]);
  };

  handleModelType = async (model_type) => {
    let files = [...this.state.previewFiles];
    let file = this.state.selected
    file['modelType'] = model_type;
    let fileIndex = files.indexOf(file);
    console.log('modeltype:', model_type)
    files[fileIndex] = file;
    this.setState({
      selected: file,
      previewFiles: files,

    });
  };


  render() {
    const {
      previewFiles,
      selected,
      // loading,
      // allSelected,
    } = this.state;
    return (
      <div className=" section-main ">
        <div className="left ">
          {!selected && (
            <ImageUploader onImageUpload={this.handleImageUpload} />
          )}
          {selected && (
            <LeftContainer
              // // loading={loading}
              // allSelected={allSelected}
              // onSelectAll={this.handleSelectAll}
              files={previewFiles}
              original={selected.url}
              upscaled={selected.upscaled}
              onClearAll={this.handleClearAll}
              onSelectOne={this.handleSelectOne}
              onDelete={this.handleDelete}
              onServerUpload={this.handleServerUpload}
            />
          )}
        </div>
        <div className="right">
          <div className= 'model-select'>
          <ModelSelect  onModelTypeSelect={this.handleModelType}/>
          </div>

        </div>
        {/* {uploaded && (
          <ImagePreviewer
            fileArray={previewFiles}
            onImageClick={this.handleServerUpload}
          />
        )}
        {selected && <LeftContainer original={selected.url} loading={loading} />} */}
      </div>
    );
  }
}

export default Body;
