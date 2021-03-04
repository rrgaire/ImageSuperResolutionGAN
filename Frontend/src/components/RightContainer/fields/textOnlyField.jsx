import React from 'react'
import {Grid,Typography,TextField} from "@material-ui/core"

export const TextOnlyField = ({title,value,handleChange,...otherProps}) => {
    return(
            <Grid container justify='space-between' wrap='nowrap' spacing={1} alignItems='center' {...otherProps}>
                <Grid item>
                    <Typography variant='h6' noWrap>{title}</Typography>
                </Grid>
                <Grid item>
                    <TextField size='small' variant='outlined' color='primary' value={value} onChange={handleChange}/>
                </Grid>                    
            </Grid>
    )
}