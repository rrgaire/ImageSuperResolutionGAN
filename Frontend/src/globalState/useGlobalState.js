import { useReducer } from "react"
import { contextVariables } from "./contextVariables"



const reducer = (state, action) => {
  switch (action.type) {
    case contextVariables.SET_BRIGHTNESS_LEVEL:
      return {
        brightnessLevel: action.payload,
      }
    default:
      return state
  }
}

const useGlobalState = () => {
  const [state, dispatch] = useReducer(reducer, {
    brightnessLevel: 75
  })
  return { state, dispatch }
}

export default useGlobalState
