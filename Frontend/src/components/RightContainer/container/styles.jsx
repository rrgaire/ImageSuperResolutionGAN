import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) =>
  createStyles({
   root:{
    margin:'10px'
   },
   sliders:{
      marginTop:'10px',
      background: '#131c24',
   },
   chooseMenu:{
     margin:'10px'
   }

  })
)