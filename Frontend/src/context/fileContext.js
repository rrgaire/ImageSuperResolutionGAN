import React from "react";

export default React.createContext({
  uploadFiles: async (e) => {},
  removeFiles: () => {},
  selectFile: (file) => {},
  uploadFileToServer: async (file) => {},
  deleteFile: (file) => {},
  getSelectedFile: () => {},
  getAllFiles: () => {},
  getLoadingState: () => {},
});
