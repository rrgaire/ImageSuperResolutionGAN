import React from 'react'
import {useStyles} from "./styles"
import {ButtonGroup,Paper} from "@material-ui/core"
import {TabPanel} from "./tabPanel"
import { Tab1 } from './tab1/tab1'
import { Tab2 } from './tab2/tab2'
import { Tab3 } from './tab3/tab3'
import { CustomButton } from '../customButton/customButton'


export const TabsMenu = ({...otherProps}) => {
    const classes = useStyles()
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return(
          <div {...otherProps}>
            <ButtonGroup fullWidth size='large' color="inherit" >
              <CustomButton active={value===0} clickHandler={()=>setValue(0)} text='Scale'/>
              <CustomButton active={value===1} clickHandler={()=>setValue(1)} text='Height'/>
              <CustomButton active={value===2} clickHandler={()=>setValue(2)} text='Weight'/>
            </ButtonGroup>      
            <div className={classes.panel}>
              <TabPanel value={value} index={0}>
                <Tab1 />
              </TabPanel>
              <TabPanel value={value} index={1} >
                <Tab2 />
              </TabPanel>
              <TabPanel value={value} index={2} >
                <Tab3 />
              </TabPanel>
            </div>
          </div>      
    )
}