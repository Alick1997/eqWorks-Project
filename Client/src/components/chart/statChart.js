import React,{useState} from 'react';
import {ButtonGroup,Button} from '@material-ui/core'
import {Bar} from 'react-chartjs-2'


export default function Chart(props){

 

    const stats = props.stats;
    const CLICKS = 'clicks'
    const IMPRESS = 'impressions';
    const REV = 'revenue';

    const [metric,toggleMetric] = useState(CLICKS)

    const eventData = {
        labels : stats.map(stat => new Date(stat.date).toDateString() ),
        datasets : [{
            label: `${metric} for the week`,
            data: stats.map(stat=> stat[metric]),
            backgroundColor: 'rgb(38, 170, 219, 0.5)'
        }      
        ]
    }
    
    return(
        <div className = "Container">
             <Bar 
                data = {eventData}
                />
                <ButtonGroup>
                    <Button variant = {metric === CLICKS ? 'contained' : 'outlined'} color = {metric === CLICKS ? 'primary' : 'default'} onClick = {()=> toggleMetric(CLICKS)}>Clicks</Button>
                    <Button variant = {metric === IMPRESS ? 'contained' : 'outlined'} color = {metric === IMPRESS ? 'primary' : 'default'} onClick = {()=> toggleMetric(IMPRESS)}>Impressions</Button>
                    <Button variant = {metric === REV ? 'contained' : 'outlined'} color = {metric === REV ? 'primary' : 'default'} onClick = {()=> toggleMetric(REV)}>Revenue</Button>
                </ButtonGroup>
        </div>
               
           
      
    )
}