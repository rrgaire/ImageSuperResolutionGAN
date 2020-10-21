export const UPLOAD_FILES = "UPLOAD_FILES";
export const REMOVE_FILES = "REMOVE_FILES";
export const UPLOAD_FILE_TO_SERVER = "UPLOAD_FILE_TO_SERVER";
export const DELETE_FILE = "DELETE_FILE";
export const SELECT_FILE = "SEECT_FILE";

const uploadFiles = (files, state) => {
  return {
    ...state,
    selectedFile: files[0],
    allFiles: files,
  };
};
const resetFiles = (state) => {
  return { ...state, selectedFile: null, allFiles: [] };
};
const selectFile = (file, state) => {
  return { ...state, selectedFile: file };
};

const uploadFileToServer = (upScaledFile, state) => {
  const files = [...state.allFiles];
  //   const oldFile = files.filter((f) => f.name === file.name);
  const indexOfFile = files.findIndex((f) => f.name === upScaledFile.name);
  files[indexOfFile] = upScaledFile;
  return { ...state, selectedFile: upScaledFile, allFiles: files };
};

const deleteFile = (file, state) => {
  let files = [...state.allFiles];
  files = files.filter((f) => f !== file);
  if (files.length === 0) return resetFiles(state);
  let currentlySelectedFile = state.selectedFile;
  if (file === currentlySelectedFile) {
    currentlySelectedFile = files[0];
  }
  return { ...state, allFiles: files, selectedFile: currentlySelectedFile };
};

export const fileReducer = (state, action) => {
  switch (action.type) {
    case UPLOAD_FILES:
      return uploadFiles(action.files, state);
    case REMOVE_FILES:
      return resetFiles(state);
    case SELECT_FILE:
      return selectFile(action.file, state);
    case UPLOAD_FILE_TO_SERVER:
      return uploadFileToServer(action.file, state);
    case DELETE_FILE:
      return deleteFile(action.file, state);
    default:
      return state;
  }
};
