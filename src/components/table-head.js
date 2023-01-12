import React from "react";
import {default as MUITableHead} from '@mui/material/TableHead';

export const TableHead=(props)=>{
    return <MUITableHead>{props.children}</MUITableHead>
}