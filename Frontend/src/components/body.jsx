import React, { Component } from "react";
import axios from "axios";
// import sizeOf from "image-size";

import { apiUrl } from '../config.json';
import ImageUploader from "./imageUploader";
import LeftContainer from "./leftContainer";
// import ImagePreviewer from "./previewImage";

class Body extends Component {
  state = {
    allSelected: false,
    selected: null,
    uploaded: false,
    loading: false,
    previewFiles: [],
    noOfSelected: 0,
  };
  updateState = (...args) => {
    this.setState({
      ...args,
    });
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

    let { allSelected, noOfSelected } = this.state;

    if (f.checked) {
      noOfSelected = noOfSelected - 1;
    }
    allSelected = noOfSelected === files.length ? true : false;

    this.setState({
      allSelected,
      noOfSelected,
      previewFiles: files,
    });
  };

  handleSelectAll = () => {
    let allSelectState = !this.state.allSelected;
    let files = [...this.state.previewFiles];
    files.map((f) => {
      let file = { ...f };
      f.checked = allSelectState;
      return f;
    });
    let noOfSelected = allSelectState ? files.length : 0;
    this.setState({
      previewFiles: files,
      allSelected: allSelectState,
      noOfSelected,
    });
    console.log(...files, noOfSelected);
  };

  handleSelectOne = (f) => {
    let files = [...this.state.previewFiles];
    let file = files.find((file) => file === f);
    let index = files.indexOf(file);
    let ff = { ...file };
    ff.checked = !ff.checked;
    let noOfSelected = this.state.noOfSelected;
    noOfSelected = ff.checked ? noOfSelected + 1 : noOfSelected - 1;
    console.log(noOfSelected);
    let allSelected = noOfSelected === files.length ? true : false;
    files[index] = ff;
    this.setState({
      previewFiles: files,
      noOfSelected,
      allSelected,
    });
  };

  handleClearAll = () => {
    console.log("allselected: ", this.state.allSelected);
    this.setState({
      noOfSelected: 0,
      allSelected: false,
      selected: null,
      uploaded: false,
      loading: false,
      previewFiles: [],
    });
  };

  handleServerUpload = async (selectedFile) => {
    let files = [...this.state.previewFiles];
    let file = files.find((f) => f === selectedFile);
    let fileIndex = files.indexOf(file);
    console.log(fileIndex);
    let f = { ...file };
    this.setState({
      selected: f,
      loading: true,
    });

    // console.log("Send to server for processing");
    const form_data = new FormData();
    form_data.append("image", f["file"], f["file"].name);
    console.log(form_data);

    try {
      console.log("connecting............");
      let result = await axios.post(
        apiUrl,
        form_data,
        {
          headers: {
            "content-type": "multipart/form-data",
            accept: "application/json",
          },
        }
      );
      result = result["data"]["prediction_result"];
      f["upscaled"] = result;
      files[fileIndex] = f;
      this.setState({
        previewFiles: files,
        selected: f,
        loading: false,
      });
      console.log('done');
    } catch (ex) {
      console.log("Some error occured!");
      return;
    }

    // if(error) return displaying error message
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
      temp["size"] = uploadedFiles[i].size;
      temp["checked"] = false;
      files.push(temp);
    }
    this.setState({
      previewFiles: [...files],
      uploaded: true,
      loading: true,
      selected: files[0],
    });
  };
  render() {
    const {
      previewFiles,
      loading,
      uploaded,
      selected,
      allSelected,
    } = this.state;
    return (
      <div className=" section-main ">
        <div className="left ">
          {!selected && (
            <ImageUploader onImageUpload={this.handleImageUpload} />
          )}
          {selected && (
            <LeftContainer
              loading={loading}
              files={previewFiles}
              original={selected.url}
              upscaled={selected.upscaled}
              loading={loading}
              allSelected={allSelected}
              onClearAll={this.handleClearAll}
              onSelectAll={this.handleSelectAll}
              onSelectOne={this.handleSelectOne}
              onDelete={this.handleDelete}
              onServerUpload={this.handleServerUpload}
            />
          )}
        </div>
        <div className="right">Right Container</div>
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
