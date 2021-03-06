const express = require('express');
const pg = require('pg');
const cors = require('cors')

const rateLimiter= require('./rateLimiter.js');

const app = express()

app.use(rateLimiter)
app.use(cors())

if(process.env.NODE_ENV === 'production')
  app.use(express.static("./Client/build"))

const pool = new pg.Pool()

const queryHandler = (req, res, next) => {
  const id = parseInt(req.params.id);
  pool.query(req.sqlQuery).then((r) => {
    return res.json(r.rows || [])
  }).catch(next)
}



app.get('/', (req, res) => {
  res.send('Welcome to EQ Works 😎')
  console.log('Called')
})


app.get('/events/hourly', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, events,poi_id
    FROM public.hourly_events
    ORDER BY date, hour DESC
    LIMIT 168;
  `
  return next()
}, queryHandler)

app.get('/events/daily', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, SUM(events) AS events
    FROM public.hourly_events
    GROUP BY date
    ORDER BY date DESC
    LIMIT 7;
  `
  return next()
}, queryHandler)

app.get('/poi/events:id', (req,res,next)=>{
  const id = req.params.id;
  req.sqlQuery = `
    SELECT SUM(events) AS events,poi_id
    FROM public.hourly_events
    WHERE poi_id = ${id}
    GROUP BY poi_id,date
    ORDER BY date DESC
    LIMIT 1;
    
  `
  return next()
},queryHandler)

app.get('/poi/stats:id', (req,res,next)=>{
  const id = parseInt(req.params.id);
  console.log("ID = " +req.params.id)
  req.sqlQuery = `
    SELECT date,SUM(impressions) AS impressions,SUM(clicks) as clicks,SUM(revenue) as revenue,poi_id
    FROM public.hourly_stats
    WHERE poi_id = ${id}
    GROUP BY poi_id,date
    ORDER BY date DESC
    LIMIT 1;
    
  `
  return next()
},queryHandler)

app.get('/stats/hourly', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, impressions, clicks, revenue,poi_id
    FROM public.hourly_stats
    ORDER BY date, hour DESC
    LIMIT 168;
  `
  return next()
}, queryHandler)

app.get('/stats/daily', (req, res, next) => {
  req.sqlQuery = `
    SELECT date,
        SUM(impressions) AS impressions,
        SUM(clicks) AS clicks,
        SUM(revenue) AS revenue
    FROM public.hourly_stats
    GROUP BY date
    ORDER BY date DESC
    LIMIT 7;
  `
  return next()
}, queryHandler)

app.get('/poi', (req, res, next) => {
  req.sqlQuery = `
    SELECT *
    FROM public.poi;
  `
  return next()
}, queryHandler)

app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`Running on ${process.env.PORT || 5555}`)
  }
})

// last resorts
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`)
  process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  process.exit(1)
})

