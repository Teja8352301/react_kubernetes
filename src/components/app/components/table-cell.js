import React from "react";
import {default as MUITableCell} from '@mui/material/TableCell';

export const TableCell=(props)=>{
    return <MUITableCell>{props.children}</MUITableCell>
}