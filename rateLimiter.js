const moment = require('moment');
const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_URL);
const WINDOW_SIZE_SECS = 10;
const MAXREQ = 100;
const WINDOW_LOG_INTERVAL_IN_HOURS = 1;


module.exports =  function  customRedisRateLimiter(req, res, next){
  try {
    // check that redis client exists
    if (!redisClient) {
      throw new Error('Redis client does not exist!');
      process.exit(1);
    }
    // fetch records of current user using IP address, returns null when no record is found
    redisClient.get(req.ip, (err, record)=> {
      if (err) throw err;
      const currentRequestTime = moment();
      console.log('recprd is: ' + record);
      //  if no record is found , create a new record for user and store to redis
      if (record === null) {
        console.log('new record')
        let newRecord = [];
        let requestLog = {
          requestTimeStamp: currentRequestTime.unix(),
          requestCount: 1
        };
        newRecord.push(requestLog);
        redisClient.set(req.ip, JSON.stringify(newRecord));
        next();
      }
      console.log('this should not run if record is: ' + record)
      // if record is found, parse it's value and calculate number of requests users has made within the last window
      let data = JSON.parse(record);
      let windowStartTimestamp = moment()
        .subtract(WINDOW_SIZE_SECS, 'seconds')
        .unix();

      let requestsWithinWindow = data.filter(entry => {
        return entry.requestTimeStamp > windowStartTimestamp;
      });
      console.log('requestsWithinWindow', requestsWithinWindow);
      let totalWindowRequestsCount = requestsWithinWindow.reduce((accumulator, entry) => {
        return accumulator + entry.requestCount;
      }, 0);
      // if number of requests made is greater than or equal to the desired maximum, return error
      if (totalWindowRequestsCount >= MAXREQ) {
        res
          .status(429)
          .jsend.error(
            `You have exceeded the ${MAXREQ} requests in ${WINDOW_SIZE_SECS} hrs limit!`
          );
      } else {
        // if number of requests made is less than allowed maximum, log new entry
        let lastRequestLog = data[data.length - 1];
        let potentialCurrentWindowIntervalStartTimeStamp = currentRequestTime
          .subtract(WINDOW_LOG_INTERVAL_IN_HOURS, 'hours')
          .unix();
        //  if interval has not passed since last request log, increment counter
        if (lastRequestLog.requestTimeStamp > potentialCurrentWindowIntervalStartTimeStamp) {
          lastRequestLog.requestCount++;
          data[data.length - 1] = lastRequestLog;
        } else {
          //  if interval has passed, log new entry for current user and timestamp
          data.push({
            requestTimeStamp: currentRequestTime.unix(),
            requestCount: 1
          });
        }
        redisClient.set(req.ip, JSON.stringify(data));
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};