import { Typography } from "@material-ui/core"
import React from "react"
import { useStyles } from "./styles"

export const ImagePreview = ({...otherProps}) => {
    const classes = useStyles()
    return(
        <div {...otherProps}>
        {/* <Typography variant='h6'>PREVIEW</Typography> */}
        <div className={classes.imageContainer}>
            Image Preview
        </div>
        </div>
    )
}