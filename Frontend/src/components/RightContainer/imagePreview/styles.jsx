import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) =>
  createStyles({
    
   imageContainer:{
    marginTop:'5px',
    textAlign:'center',
    border:'1px solid white',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
     height:'250px'
   }
  })
)