import React from 'react'
import {Grid,Slider,Typography} from "@material-ui/core"

export const SliderBar = ({name,value,handleChange,...otherProps}) => {
    return(
        <div {...otherProps}>
        <Typography id="continuous-slider" gutterBottom variant='h6'>
        {name}
      </Typography>
        <Grid container spacing={2} alignItems='center'>   
        <Grid item xs>
          <Slider color='primary' value={value} onChange={handleChange} aria-labelledby="continuous-slider"/>
        </Grid>
        <Grid item>
          <Typography variant='h6'>{value}</Typography>
        </Grid>
      </Grid>
      </div>
    )
}