
import {useState,useEffect} from 'react';
import {ButtonGroup,Button} from '@material-ui/core';
import './App.css';
import DatTable from './components/table/table';
import Chart from './components/chart/chart';
import Map from './components/map/map'
import {getHourlyEvents, getDailyEvents,getHourlyStats,getDailyStats,getPOI,getPOIEvents,getPOIStats} from './api'

function App() {

  const tableSel = 'tab';
  const mapSel = 'map';
  const chartSel = 'cha';

  const [dailyEvents,setDailyEvents] = useState([]);
  const [hourlyEvents,setHourlyEvents] = useState([]);

  const [dailyStats,setDailyStats] = useState([]);
  const [hourlyStats,setHourlyStats] = useState([]);

  const [POIs,setPOIs] = useState([]);
  const [aggPOI,setAggPOI] = useState([]);

  const [aggValues,setAggValues] = useState([]);

  const[contentSel,setContent] = useState(tableSel)

  const [loading,toggleLoading] = useState(true);
  

  


  useEffect(()=>{
    (async ()=>{
      //Fetches and organizes data on mount of main branch. 
      try{
        const dailyEventsTemp = await getDailyEvents();
        const hourlyEventsTemp = await getHourlyEvents();
        const dailyStatsTemp = await getDailyStats();
        const hourlyStatsTemp = await getHourlyStats();
        const POItemp = await getPOI();

        setDailyEvents(dailyEventsTemp);
        setHourlyEvents(hourlyEventsTemp);
        setDailyStats(dailyStatsTemp);
        setHourlyStats(hourlyStatsTemp);
        setPOIs(POItemp);

        

      }catch(error){
        console.log(error)
      }finally{
        toggleLoading(false)
      }
    })();
  },[]);

  useEffect(()=>{
    (async ()=>{
      try{
        const aggData =  await Promise.all(POIs.map(async (poi)=>{
          const tempStats = await getPOIStats(poi.poi_id);
          const tempEvents = await getPOIEvents(poi.poi_id);
        
          return {...poi,...tempStats[0],revenue: parseFloat(tempStats[0].revenue).toFixed(2),...tempEvents[0]}
         
        }) )
        setAggPOI(aggData);
      }catch{

      }
    })();
  },[POIs])

  useEffect(()=>{
    try{
      aggregateDate();
    }catch{
      console.log('error man')
    }
  },[dailyEvents,hourlyEvents,dailyStats,hourlyStats])

    //This function takes advantage of how heavily structured the data is.
    //Since all data is ordered by date, and we can easily predict indexes on hourly stats array.
    //O(n^2)
  function aggregateDate(){
    const tempData = [];
    let eventIndex = 0;
    for(let i = 0; i < dailyEvents.length; i++){
      let hourlyIndex = i * 24;
      let hourlyInEnd = hourlyIndex + 24;
      let dayData = {};

      //safe checks
      if('date' in dailyEvents[i] && 'events' in dailyEvents[i]){
        dayData.date = new Date(dailyEvents[i].date).toDateString();
        dayData.events = parseInt(dailyEvents[i].events)
      }
     

        //safe checks
      if('clicks' in dailyStats[i] && 'impressions' in dailyStats[i] && 'revenue' in dailyStats[i]){
        dayData.clicks = parseInt(dailyStats[i].clicks);
        dayData.impressions = parseInt(dailyStats[i].impressions);
        dayData.revenue = parseFloat((parseFloat(dailyStats[i].revenue) ).toFixed(2) )
      }
     
      const hourlyEvFormatted = [];


      while(eventIndex < hourlyEvents.length && hourlyEvents[eventIndex].date === dayData.date){//while loop loops over events for the day.
          hourlyEvFormatted.push(hourlyEvents[eventIndex]);
            eventIndex++;
      }
        
      dayData = {...dayData,hourlyEvents: hourlyEvFormatted, hourlyStats: hourlyStats.slice(hourlyIndex, hourlyInEnd) }; //hourlystats are always formatted in a period of 24 hrs.
      tempData.push(dayData);
    }
    console.log(tempData)
    setAggValues(tempData);
  }

  if(loading)
    return(
      <div className = "App">
        <h1>Loading</h1>
      </div>
    )
  
  return (
    <div className="App">
      <header className="App-header">
          <h1>EQ Works Dashboard!</h1>
      </header>
      <div>
          <ButtonGroup>
              <Button onClick = {()=> setContent(chartSel)} variant = "contained" color = {contentSel === chartSel ? 'primary' : 'default'}>Chart</Button>
              <Button onClick = {()=> setContent(tableSel)} variant = "contained" color = {contentSel === tableSel ? 'primary' : 'default'}>Table</Button>
              <Button onClick = {()=> setContent(mapSel)} variant = "contained" color = {contentSel === mapSel ? 'primary' : 'default'}>Map</Button>
          </ButtonGroup>
          {
            contentSel === tableSel ? <DatTable data = {aggValues} pois = {POIs}/> :
            contentSel === chartSel ? <Chart events = {dailyEvents} stats = {dailyStats}/> : <Map POIs = {aggPOI}/>
          }
          
      </div>
      <div>

      </div>
    </div>
  );
}

export default App;
