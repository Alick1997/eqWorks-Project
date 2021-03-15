import React,{useState,useEffect} from 'react';
import {Table,TableHead, TableRow,TableContainer,Paper, TableCell,TableBody} from '@material-ui/core'
import './Table.css';
import DataRow from './tableRow';
import TableModal from './tableModal'


export default function TableComp(props){

    const data = props.data;
    const pois = props.pois;
    const [tableDat,setTableDat] = useState([]);
    const [modalOpen,toggleOpen] = useState(false);
    const [modalDat,setModalDat] = useState([]);
    const [POIs,setPOIs] = useState([]);
    const [modalDate,setModalDate] = useState();
   

   function setModal(data,date){
       setModalDat(data);
       setModalDate(date)
       setPOIs(pois);
       toggleOpen(true)
   }

   useEffect(()=>{
        setTableDat(data)
        console.log(data)
   },[data])



    return(
        <div className = "Container">
            <h2>Statistics By Date</h2>
            <TableModal 
                open = {modalOpen}
                data = {modalDat}
                POIs = {POIs}
                date = {modalDate}
                onClick = {()=> toggleOpen(false)}
            />
            <TableContainer component = {Paper}>
            <Table aria-label="collapsible table" >
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Events</TableCell>
                        <TableCell>Impressions</TableCell>
                        <TableCell>Clicks</TableCell>
                        <TableCell>Revenue</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableDat.map(row=> 
                    <TableRow key = {row.date}>
                        <DataRow data ={row} onClick = {(dat,date)=> setModal(dat,date)}/>
                    </TableRow>
                    )
                    }
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}