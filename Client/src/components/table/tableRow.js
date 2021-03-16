import React from 'react';
import {TableCell} from '@material-ui/core';

export default function TableComp(props){
const data = props.data;


return(
    <>
    <TableCell  style = {{cursor:'pointer'}}>
       <p className = "ClickableText" onClick = {()=> props.onClick(data.hourlyStats,data.date)}> {data.date} </p> 
    </TableCell>
    <TableCell>
        {data.events}
    </TableCell>
    <TableCell>
        {data.impressions}
    </TableCell>
    <TableCell>
        {data.clicks}
    </TableCell>
    <TableCell>
       ${ data.revenue}
    </TableCell>
    </>
)

}