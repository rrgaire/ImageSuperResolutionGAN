import React, { Component } from "react";
import axios from "axios";
import sizeOf from "image-size";

import ImageUploader from "./imageUploader";
import LeftContainer from "./leftContainer";
import ImagePreviewer from "./previewImage";

import { postUrl } from "../config.json";

class Body extends Component {
  state = {
    allSelected: false,
    selected: null,
    uploaded: false,
    loading: false,
    previewFiles: [],
    noOfSelected: 0,
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
    });
    console.log(f["file"]);

    console.log("Send to server for processing");
    const form_data = new FormData();
    form_data.append("image", f["file"], f["name"]);
    console.log(form_data);
    //endpoint here
    try {
      let result = await axios.post(postUrl, form_data, {
        headers: {
          "content-type": "multipart/form-data",
          accept: "application/json",
        },
      });
    } catch (ex) {
      console.log("Some error occured!");
      return;
    }

    // if(error) return displaying error message
    f["upscaled"] = "Data received from server";
    files[fileIndex] = f;
    console.log(files);
    this.setState({
      previewFiles: files,
      selected: f,
    });
    console.log(this.state.previewFiles);
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
      // console.log(temp);
    }
    this.setState({
      // inputFiles: [...uploadedFiles],
      previewFiles: [...files],
      uploaded: true,
      loading: true,
      selected: files[0],
    });

    // this.handleServerUpload(this.state.selected.name);

    // setTimeout(() => {
    //   this.setState({ loading: false });
    // }, 5000);
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
      <div className="row section-main p-0 m-0">
        <div className="col-9 left p-0 ">
          {!selected && (
            <ImageUploader onImageUpload={this.handleImageUpload} />
          )}
          {selected && (
            <LeftContainer
              files={previewFiles}
              original={selected.url}
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
        <div className="col-3 right p-0">Right Container</div>

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
