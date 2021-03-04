import React,{useState} from "react"
import { useStyles } from "./styles"
import { ImagePreview } from "../imagePreview/imagePreview"
import { Sliders } from "../sliders/sliders"
import { TabsMenu } from "../tabsMenu/tabsMenu"
import {Choose} from "../choose/choose"

export const RightContainer = () => {
    const classes = useStyles()
    const [choose1,setChoose1] = useState('on') 
    const [choose2,setChoose2] = useState('manual') 


    return(
        <div className={classes.root}>
         <ImagePreview />
         <Sliders className={classes.sliders}/>
         <TabsMenu />
         <Choose 
            className={classes.chooseMenu}
            title='Image Refinement'
            helpText='Set image refinement on or off'
            options={[
                {
                    title:'Off',
                    value:'off'
                },
                {
                    title:'On',
                    value:'on'
                }
            ]}
            value={choose1}
            changeValue={(val)=>setChoose1(val)}
          />
          <Choose 
            className={classes.chooseMenu}
            title='Select Mode'
            helpText='Set image edit mode'
            options={[
                {
                    title:'Manual',
                    value:'manual'
                },
                {
                    title:'Auto',
                    value:'auto'
                }
            ]}
            value={choose2}
            changeValue={(val)=>setChoose2(val)}
          />
        </div>
    )
}