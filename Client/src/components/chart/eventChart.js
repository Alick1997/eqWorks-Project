import React from 'react';
import {Bar} from 'react-chartjs-2'


export default function Chart(props){

  
    const events = props.events;
   

    const eventData = {
        labels : events.map(event => new Date(event.date).toDateString() ),
        datasets : [{
            label: 'Events for the week',
            data: events.map(event=> event.events),
            backgroundColor: 'rgb(38, 170, 219, 0.5)'
        }      
        ]
    }
    
    return(
        <div className = "Container">
            <Bar 
            data = {eventData}
                />
  
        </div>
                
    )
}