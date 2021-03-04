export const UPLOAD_FILES = "UPLOAD_FILES";
export const REMOVE_FILES = "REMOVE_FILES";
export const DELETE_FILE = "DELETE_FILE";
export const SELECT_FILE = "SEECT_FILE";
export const API_CALL_REQUEST = "API_CALL_REQUEST";
export const API_CALL_SUCCESS = "API_CALL_SUCCESS";
export const API_CALL_FAIL = "API_CALL_FAIL";
export const SELECT_MODEL_TYPE = "SELECT_MODEL_TYPE";

const uploadFiles = (payload, state) => {
  const { files, message } = payload;
  const { allFiles } = state;
  return {
    ...state,
    selectedFile: files[0],
    allFiles: [...allFiles, ...files],
    message,
  };
};
const removeFiles = (state) => {
  return {
    ...state,
    selectedFile: null,
    allFiles: [],
    loading: false,
    message: "",
  };
};
const selectFile = (payload, state) => {
  const { file, message } = payload;
  return { ...state, selectedFile: file, message };
};
const deleteFile = (payload, state) => {
  const { file } = payload;
  let files = [...state.allFiles];
  files = files.filter((f) => f !== file);
  return {
    ...state,
    allFiles: files,
  };
};

const apiCallRequest = (state) => {
  return { ...state, loading: true };
};

const apiCallSuccess = (payload, state) => {
  const { upScaledFile } = payload;
  const files = [...state.allFiles];
  console.log("fads", upScaledFile);
  //   const oldFile = files.filter((f) => f.name === file.name);
  const indexOfFile = files.findIndex((f) => f.name === upScaledFile.name);
  files[indexOfFile] = upScaledFile;
  return {
    ...state,
    selectedFile: upScaledFile,
    allFiles: files,
    loading: false,
  };
};

const apiCallFail = (payload, state) => {
  const { message } = payload;
  return { ...state, loading: false, message };
};

const selectModelType = (payload, state) => {
  const { modelType } = payload;
  const files = [...state.allFiles];
  const selectedFile = state.selectedFile;
  const fileIndex = files.findIndex((f) => f === selectedFile);
  selectedFile.modelType = modelType;
  files[fileIndex] = selectedFile;

  return { ...state, allFiles: files, selectedFile };
};

export const fileReducer = (state, action) => {
  switch (action.type) {
    case UPLOAD_FILES:
      return uploadFiles(action.payload, state);
    case REMOVE_FILES:
      return removeFiles(state);
    case SELECT_FILE:
      return selectFile(action.payload, state);
    case DELETE_FILE:
      return deleteFile(action.payload, state);
    case API_CALL_REQUEST:
      return apiCallRequest(state);
    case API_CALL_SUCCESS:
      return apiCallSuccess(action.payload, state);
    case API_CALL_FAIL:
      return apiCallFail(action.payload, state);
    case SELECT_MODEL_TYPE:
      return selectModelType(action.payload, state);
    default:
      return state;
  }
};
