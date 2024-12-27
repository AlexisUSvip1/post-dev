import { Box } from "@mui/material"
import { useStyles } from "./PositionLogo.style";
import logoIcon from "../../assets/logo.svg"

export const PositionLogo =() =>{
    const classes = useStyles();
  
  return (
  <Box className={classes.topContainer}>
    <img src={logoIcon} alt="logo" className={classes.topImage}/>
  </Box>)
}