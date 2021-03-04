import React from 'react'
import {useStyles} from "./styles"
import {FormField} from "../../fields/formField"


export const Tab2 = () => {
    const classes = useStyles()
    const [value1,setValue1] = React.useState('')
    const [option, setOption] = React.useState('inches');
    const handleOptionChange = (event) => setOption(event.target.value)
    const handleValue1Change = (event) => setValue1(event.target.value)
    
    return(
        <div className={classes.root}>
            <FormField 
                title='Height'
                value={value1}
                selectValue={option}
                handleChange={handleValue1Change}
                options={[
                    {
                        name:'inches',
                        value:'inches'
                    },
                    {
                        name:'pixels',
                        value:'pixels'
                    },
                    {
                        name:'percent',
                        value:'percent'
                    },
                ]}
                handleSelectChange={handleOptionChange}
            />
           
        </div>
    )
}