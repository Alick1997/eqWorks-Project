import React,{useState} from 'react';
import {RadioGroup,Radio,FormControlLabel} from '@material-ui/core'
import EventChart from './eventChart'
import StatChart from './statChart'


export default function Chart(props){

    const EVENTOP = 'events';
    const STATOP = 'stats';

    const events = props.events;
    const stats = props.stats;

    const [metric,toggleMetric] = useState(EVENTOP)

    
    return(
        <div className = "Container">
            <h1>Charts</h1>
            <RadioGroup name = 'metric' value = {metric} onChange = {e=> toggleMetric(e.target.value)} className = "HorizontalFlex">
                <FormControlLabel value = {EVENTOP} control = {<Radio color = 'primary' />} label = 'View Daily Events' />
                <FormControlLabel value = {STATOP} control = {<Radio color = 'primary'/>} label = "View Daily Stats" />
            </RadioGroup>
             {
                 metric === EVENTOP 
                        ?
                 <EventChart events = {events} />
                        :
                <StatChart stats = {stats}/>
             }
           
            
        </div>
    )
}