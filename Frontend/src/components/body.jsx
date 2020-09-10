import React, { Component } from "react";
import axios from "axios";
import sizeOf from "image-size";

import ImageUploader from "./imageUploader";
import LeftContainer from "./leftContainer";
import ImagePreviewer from "./previewImage";


class Body extends Component {
  state = {
    selected: null,
    uploaded: false,
    loading: false,
    previewFiles: [],
  };

  handleServerUpload = async (fileName) => {
    console.log("handleServerUpload");

    let files = [...this.state.previewFiles];
    let file = files.find((f) => f.name === fileName);
    let fileIndex = files.indexOf(file);
    console.log(fileIndex);
    let f = { ...file };
    this.setState({
      selected: f,
    });
    if (f.upscaled) {
      console.log("No need to process in server");
    } else {
      console.log("Send to server for processing");
      // const fd = new FormData();
      // fd.append("image", obj.file, obj.name);
      // let result = await axios.post("endpoint here", fd); //endpoint here
      // console.log(result);
      // if(error) return displaying error message.
      f["upscaled"] = "Data received from server";
      files[fileIndex] = f;
      console.log(files);
      this.setState({
        previewFiles: files,
        selected: f,
      });
      console.log(this.state.previewFiles);
    }
  };

  handleImageUpload = async (e) => {
    let files = [];
    let uploadedFiles = e.currentTarget.files;
    let numberOfFiles = uploadedFiles.length;

    for (let i = 0; i < numberOfFiles; i++) {
      let temp = {};
      temp["name"] = uploadedFiles[i].name;
      temp["url"] = await URL.createObjectURL(uploadedFiles[i]);
      temp["file"] = uploadedFiles[i];
      temp["size"] = uploadedFiles[i].size;


      files.push(temp);
      console.log(temp);
    }
    this.setState({
      // inputFiles: [...uploadedFiles],
      previewFiles: [...files],
      uploaded: true,
      loading: true,
      selected: files[0],
    });

    this.handleServerUpload(this.state.selected.name);

    setTimeout(() => {
      this.setState({ loading: false });
    }, 5000);
  };
  render() {
    const { previewFiles, loading, uploaded, selected } = this.state;
    return (
      <div className="row section-main p-0 m-0">
        <div className="col-9 left p-0 ">
          {!selected && (
            <ImageUploader onImageUpload={this.handleImageUpload} />
          )}
          {selected && (
            <LeftContainer files={previewFiles} original={selected.url} loading={loading} />
          )}
        </div>
        <div className="col-3 right p-0"></div>

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
