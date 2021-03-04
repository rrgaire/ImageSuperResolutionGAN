import React from 'react'
import {Grid,Typography,TextField,Select,MenuItem,FormControl} from "@material-ui/core"

export const FormField = ({title,value,handleChange,options,selectValue,handleSelectChange,...otherProps}) => {
    return(
            <Grid container justify='space-between' wrap='nowrap' spacing={1} alignItems='center' {...otherProps}>
                <Grid item>
                    <Typography variant='h6' noWrap>{title}</Typography>
                </Grid>
                <Grid container spacing={1} wrap='nowrap' item justify='flex-end'>
                    <Grid item>
                        <TextField size='small' variant='outlined' color='primary' value={value} onChange={handleChange}/>
                    </Grid>                
                    <Grid item>
                    <FormControl variant="outlined" size='small'>
                        <Select
                        value={selectValue}
                        onChange={handleSelectChange}
                        >
                        {options.map(option => <MenuItem value={option.value} key={option.value}>{option.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    </Grid>
                </Grid>
            </Grid>
    )
}