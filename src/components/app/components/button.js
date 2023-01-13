import React from "react";
import {default as MUIButton} from '@mui/material/Button';

export const Button = (props) =>{
    return <MUIButton onClick={props.clicking} variant="contained" fullWidth>{props.children}</MUIButton>
}