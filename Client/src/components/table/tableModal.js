import React,{useState,useEffect} from 'react'
import {Table,Dialog,TableHead,TableBody,TableRow,TableContainer,Paper,TableCell,Input} from '@material-ui/core'
import DataRow from './hourlyRow';
import Fuse from 'fuse.js';
import './Table.css';

export default function TableModal(props){

    const openT = props.open;
    const dateT = props.date;
    const dataT = props.data;
    const POIs = props.POIs;

    const [data,setData] = useState([]);
    const [date,setDate] = useState('test');
    const [pois,setpoi] = useState([]);

    const[searchVal,setSearchVal] = useState('');
    const [searchResults,setSearchResults] = useState([]);
    const [open,toggleOpen] = useState(openT);

    const fuseOptions = {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 50,
        maxPatternLength: 12,
        minMatchCharLength: 3,
        keys: ['name']
      };

    const fuse = new Fuse(pois,fuseOptions);

    useEffect(()=>{
        setData(dataT)
        setDate(dateT)
        setpoi(POIs);
        toggleOpen(openT)
    },[dataT,openT]);

    useEffect(()=>{
        const vals = fuse.search(searchVal);
        setSearchResults(vals);
        
    },[searchVal])

   

      

    function resetState(){
        setData([]);
    }

    return(
        <Dialog
            open = {open}
            style = {{width: '90%'}}
            onClose = {(e)=> resetState}
            className = "ModalContainer"
            maxWidth = 'lg'
            fullWidth = {true}
            onBackdropClick= {()=> props.onClick()}
            
          
        >
            <div className = "FlexDisplay">
                <h2 onClick = {()=> props.onClick()}>Statistics From: {date ? date : null}</h2>
                <Input
                placeholder = 'Search through points of interest'
                onChange = {e=> setSearchVal(e.target.value)}
                fullWidth
                className = "Padding"
                
                />
                <TableContainer component = {Paper}>
                    <Table stickyHeader className = "Padding">
                <TableHead>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Point of Interest</TableCell>
                        <TableCell>Impressions</TableCell>
                        <TableCell>Clicks</TableCell>
                        <TableCell>Revenue</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(entry=> {
                       
                        const poiVal = pois.find(poi=> poi.poi_id === entry.poi_id);
                        let classN = '';
                        searchResults.find(ind=> ind.item.name === poiVal.name) !== undefined ? classN = 'SelectedRow' : classN = '';
                        
                        return(
                            <TableRow classes = {{root: classN}} key = {entry.hour}>
                            <DataRow data = {{...entry,poiTitle : poiVal.name}}/>
                        </TableRow>
                        )
                          
                        })
                    }
                
                </TableBody>
                </Table>
                </TableContainer>
            </div>
        </Dialog>
    )

    
}