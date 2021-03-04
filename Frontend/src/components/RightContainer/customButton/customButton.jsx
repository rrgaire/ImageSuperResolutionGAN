import React from 'react'
import {Button} from "@material-ui/core"

export const CustomButton = ({text,clickHandler,active,...otherProps}) => (
<Button style={{background:active && '#194d7b'}} onClick={clickHandler} {...otherProps}>
    {text}
</Button>
)