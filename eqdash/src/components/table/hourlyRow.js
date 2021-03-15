import React from 'react';
import {TableCell} from '@material-ui/core';

export default function TableComp(props){
const data = props.data;


return(
    <>
    <TableCell>
        {data.hour + 1}
    </TableCell>
    <TableCell>
        {data.poiTitle}
    </TableCell>
    <TableCell>
        {data.impressions}
    </TableCell>
    <TableCell>
        {data.clicks}
    </TableCell>
    <TableCell>
       ${ (parseFloat(data.revenue)).toFixed(2)}
    </TableCell>
    </>
)

}