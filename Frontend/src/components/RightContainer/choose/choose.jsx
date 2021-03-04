import { Typography,Tooltip,IconButton,ButtonGroup } from '@material-ui/core'
import React from 'react'
import HelpIcon from '@material-ui/icons/Help';
import { CustomButton } from '../customButton/customButton';

export const Choose = ({title,helpText,options,value,changeValue,...otherProps}) => {
    return(
        <div {...otherProps}>
            <Typography variant='h6' component='div' gutterBottom>
                {title}
                <Tooltip title={helpText}>
                    <IconButton>
                        <HelpIcon />
                    </IconButton>
                </Tooltip>
            </Typography>
            <ButtonGroup fullWidth size='large' color="inherit" >
                {
                    options.map(option =>
                        <CustomButton key={option.value} active={option.value === value} clickHandler={()=>changeValue(option.value)} text={option.title}/>
                        ) 
                }
            </ButtonGroup> 
        </div>
    )
}