import React from 'react'
import {useStyles} from "./styles"
import {FormField} from "../../fields/formField"
import { TextOnlyField } from '../../fields/textOnlyField'

export const Tab1 = () => {
    const classes = useStyles()
    const [option, setOption] = React.useState('inches');
    const [value1,setValue1] = React.useState('')
    const [value2,setValue2] = React.useState('')
  const handleValue1Change = (event) => setValue1(event.target.value)
  const handleOptionChange = (event) => setOption(event.target.value)
  const handleValue2Change = (event) => setValue2(event.target.value)

    return(
        <>
        <div className={classes.root}>
            <FormField 
                title='Max Scale'
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
            <TextOnlyField 
                className={classes.secondField}
                title='PPI'
                value={value2}
                handleChange={handleValue2Change}
            />
        </div>
        </>
    )
}