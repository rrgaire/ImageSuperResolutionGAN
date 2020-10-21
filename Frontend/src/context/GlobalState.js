import React, { useReducer } from "react";
import axios from "axios";
import { apiUrl } from "../config.json";

import FileContext from "./file-context";
import {
  fileReducer,
  UPLOAD_FILES,
  REMOVE_FILES,
  UPLOAD_FILE_TO_SERVER,
  DELETE_FILE,
  SELECT_FILE,
} from "./reducers";

const GlobalState = (props) => {
  const initState = {
    selectedFile: null,
    allFiles: [],
  };
  const [fileState, dispatch] = useReducer(fileReducer, initState);

  const uploadFiles = async (e) => {
    let files = [];
    let uploadedFiles = e.currentTarget.files;
    let numberOfFiles = uploadedFiles.length;

    for (let i = 0; i < numberOfFiles; i++) {
      let temp = {};
      temp["name"] = `image${i + 1}.${uploadedFiles[i].name.split(".")[1]}`;
      temp["url"] = await URL.createObjectURL(uploadedFiles[i]);
      temp["file"] = uploadedFiles[i];
      temp["size"] = uploadedFiles[i].size;
      temp["upscaledData"] = "";
      // temp["checked"] = false;
      files.push(temp);
    }
    dispatch({ type: UPLOAD_FILES, files: files });
  };

  const removeFiles = () => {
    dispatch({ type: REMOVE_FILES });
  };

  const selectFile = (file) => {
    dispatch({ type: SELECT_FILE, file: file });
  };

  const uploadFileToServer = async (file) => {
    dispatch({ type: SELECT_FILE, file: file });
    if (file.upscaledData) {
      return;
    } else {
      const form_data = new FormData();
      form_data.append("image", file["file"], file["file"].name);
      try {
        console.log("connecting............");
        let result = await axios.post(apiUrl, form_data, {
          headers: {
            "content-type": "multipart/form-data",
            accept: "application/json",
          },
        });
        result = result["data"]["prediction_result"];
        file["upscaledData"] = result;
        console.log("done");
        dispatch({ type: UPLOAD_FILE_TO_SERVER, file: file });
      } catch (error) {
        console.log("error occured..");
      }
    }
  };

  const deleteFile = (file) => {
    dispatch({ type: DELETE_FILE, file: file });
  };

  return (
    <FileContext.Provider
      value={{
        selectedFile: fileState.selectedFile,
        allFiles: fileState.allFiles,
        uploadFiles: uploadFiles,
        removeFiles: removeFiles,
        selectFile: selectFile,
        uploadFileToServer: uploadFileToServer,
        deleteFile: deleteFile,
      }}>
      {props.children}
    </FileContext.Provider>
  );
};

export default GlobalState;
