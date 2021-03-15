import React,{useState,useEffect} from 'react';
import {MapContainer,Marker,TileLayer, Popup,Tooltip} from 'react-leaflet';
import {ButtonGroup,Button} from '@material-ui/core';
import {getPOIStats,getPOIEvents} from '../../api'
import './Map.css'


export default function MapT(props){

  const EVENTSOP = 'events';
  const IMPRESSIONOP = 'impressions'
  const CLICKSOP = 'clicks'
  const REVENUEOP = 'revenue'

  const POIs = props.POIs;
  const [metric,setMetric] = useState(EVENTSOP);
  const center = Array.isArray(POIs) && POIs.length > 0 ? [POIs[0].lat,POIs[0].lon] : [43.6708,-79.3899]


  

    return(
        <div className = "Container">
           <ButtonGroup>
             <Button variant = "contained" color = {metric === EVENTSOP ? 'primary' : 'default'} onClick = {()=> setMetric(EVENTSOP)}>Events</Button>
             <Button variant = "contained" color = {metric === CLICKSOP ? 'primary' : 'default'} onClick = {()=> setMetric(CLICKSOP)}>Clicks</Button>
             <Button variant = "contained" color = {metric === IMPRESSIONOP ? 'primary' : 'default'} onClick = {()=> setMetric(IMPRESSIONOP)}>Impressions</Button>
             <Button variant = "contained" color = {metric === REVENUEOP ? 'primary' : 'default'} onClick = {()=> setMetric(REVENUEOP)}>Revenue</Button>
           </ButtonGroup>
            <MapContainer center = {center} zoom = {15}>
           
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
         
        {POIs.map(poi=>
          <Marker 
          key = {poi.poi_id} position = {[poi.lat,poi.lon]} >
            <Popup >
            <h2>{poi.name}</h2>
            <p>Impressions: {poi.impressions}</p>
            <p>Clicks: {poi.clicks}</p>
            <p>Revenue: ${poi.revenue}</p>
            <p>Events: {poi.events}</p>
            </Popup>
            <Tooltip permanent>
              <h2>{poi.name}</h2>
              <p>{metric}: {poi[metric]}</p>
            </Tooltip>
          </Marker>
        )}
            </MapContainer>
      </div>
    )
}