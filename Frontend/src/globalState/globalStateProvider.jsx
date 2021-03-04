
import React from "react"
import Context from "./context"
import useGlobalState from "./useGlobalState"

const GlobalStateProvider = ({ children }) => {
  return (
    <Context.Provider value={useGlobalState()}>{children}</Context.Provider>
  )
}

export default GlobalStateProvider
