import React from 'react'
import { SliderBar } from './sliderbar'

export const Sliders = ({...otherProps}) => {
    const [value1, setValue1] = React.useState(30);
    const [value2,setValue2] = React.useState(78)
    const handleChange1 = (event,newValue) => {
      setValue1(newValue);
    };
    const handleChange2 = (event,newValue) => {
        setValue2(newValue);
      };
    return(
            <div style={{ padding:'15px'}} {...otherProps}>
                <SliderBar value={value1} handleChange={handleChange1} name={'Contrast'}/>
                <SliderBar value={value2} handleChange={handleChange2} name={'Saturation'}/>
            </div>
    )
}