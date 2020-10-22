import React, { useReducer } from "react";
import axios from "axios";
import { apiUrl } from "../config.json";

import FileContext from "./fileContext";
import {
  fileReducer,
  UPLOAD_FILES,
  REMOVE_FILES,
  API_CALL_SUCCESS,
  API_CALL_REQUEST,
  API_CALL_FAIL,
  DELETE_FILE,
  SELECT_FILE,
  SELECT_MODEL_TYPE,
} from "./reducers";

const GlobalState = (props) => {
  const ERR_MESSAGE =
    "Sorry, the requested action cannot be completed..Press Scale Button For Upscaling.";
  const MESSAGE = "Press Scale Button For Upscaling.";

  const initState = {
    selectedFile: null,
    allFiles: [],
    loading: false,
    message: "",
  };
  const [fileState, dispatch] = useReducer(fileReducer, initState);

  const uploadFiles = async (e) => {
    let files = [];
    let uploadedFiles = e.currentTarget.files;
    let numberOfFiles = uploadedFiles.length;

    for (let i = 0; i < numberOfFiles; i++) {
      let temp = {};
      const fileName = uploadedFiles[i].name.split(".");
      temp["name"] =
        fileName[0].length < 17
          ? uploadedFiles[i].name
          : `${fileName[0].substr(0, 17)} ...${fileName[1]}`;
      temp["url"] = await URL.createObjectURL(uploadedFiles[i]);
      temp["file"] = uploadedFiles[i];
      temp["size"] = uploadedFiles[i].size;
      temp["upscaledData"] = "";
      temp["modelType"] = "Generic Model";
      // temp["checked"] = false;
      files.push(temp);
    }
    dispatch({
      type: UPLOAD_FILES,
      payload: { files: files, message: MESSAGE },
    });
  };

  const removeFiles = () => {
    dispatch({ type: REMOVE_FILES });
  };

  const selectFile = (file) => {
    dispatch({
      type: SELECT_FILE,
      payload: { file: file, message: MESSAGE },
    });
  };

  const uploadFileToServer = async (file) => {
    dispatch({ type: SELECT_FILE, payload: { file: file, message: MESSAGE } });
    if (file.upscaledData) {
      return;
    } else {
      try {
        dispatch({ type: API_CALL_REQUEST });
        const form_data = new FormData();
        form_data.append("image", file["file"], file["file"].name);
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
        dispatch({ type: API_CALL_SUCCESS, payload: { upscaledFile: file } });
      } catch (error) {
        dispatch({
          type: API_CALL_FAIL,
          payload: { message: ERR_MESSAGE },
        });
        console.log("error occured..");
      }
    }
  };

  const deleteFile = async (file) => {
    const currentlySelectedFile = fileState.selectedFile;
    await dispatch({ type: DELETE_FILE, payload: { file: file } });
    const allFiles = fileState.allFiles.filter((f) => f !== file);
    console.log();
    if (allFiles.length === 0) {
      removeFiles();
    } else if (file === currentlySelectedFile) {
      console.log("if");
      selectFile(allFiles[0]);
    }
  };

  const selectModelType = (modelType) => {
    console.log("mod", modelType);
    dispatch({ type: SELECT_MODEL_TYPE, payload: { modelType } });
  };

  const getAllFiles = () => {
    return fileState.allFiles;
  };
  const getSelectedFile = () => {
    return fileState.selectedFile;
  };
  const getLoadingState = () => {
    return fileState.loading;
  };
  const getMessage = () => {
    return fileState.message;
  };

  return (
    <FileContext.Provider
      value={{
        uploadFiles: uploadFiles,
        removeFiles: removeFiles,
        selectFile: selectFile,
        uploadFileToServer: uploadFileToServer,
        deleteFile: deleteFile,
        getAllFiles: getAllFiles,
        getSelectedFile: getSelectedFile,
        getLoadingState: getLoadingState,
        getMessage: getMessage,
        selectModelType: selectModelType,
      }}>
      {props.children}
    </FileContext.Provider>
  );
};

export default GlobalState;
