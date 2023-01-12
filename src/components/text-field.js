import React from "react";
import {default as MUITextField} from '@mui/material/TextField';

export const TextField = (props) =>{
    return <MUITextField type={props.type} name={props.name} onChange={props.change} fullWidth label={props.label} id={props.id} />
}