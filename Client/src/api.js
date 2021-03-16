
/**
 * Fetches daily events. returns a promise which will return json obj if fulfilled
 */
export async function getDailyEvents(){

    try{
        const res = await fetch('/events/daily')
        return await res.json();
    }catch(error){
        throw error
    }
}


/**
 * Fetches hourly events. returns a promise which will return json obj if fulfilled
 */
export async function getHourlyEvents(){

    try{
        const res = await fetch('/events/hourly')
        return await res.json();
    }catch(error){
        throw error
    }
}


/**
 * Fetches daily stats. returns a promise which will return json obj if fulfilled
 */
export async function getDailyStats(){

    try{
        const res = await fetch('/stats/daily')
        return await res.json();
    }catch(error){
        throw error
    }
}


/**
 * Fetches hourly stats. returns a promise which will return json obj if fulfilled
 */
export async function getHourlyStats(){

    try{
        const res = await fetch('/stats/hourly')
        return await res.json();
    }catch(error){
        throw error
    }
}


/**
 * Fetches POIs. returns a promise which will return json obj if fulfilled
 */
export async function getPOI(){

    try{
        const res = await fetch('/poi')
        return await res.json();
    }catch(error){
        throw error
    }
}
/**
 * Gets all events for specific POI
 * @param {id of event to get} id 
 */
export async function getPOIEvents(id){
    try{
        const res = await fetch(`poi/events${id}`);
        return await res.json();
    }catch(error){
        throw error;
    }
}

/**
 * Gets all events for specific POI
 * @param {events} id 
 */
export async function getPOIStats(id){
    try{
        const res = await fetch(`poi/stats${id}`);
        return await res.json();
    }catch(error){
        throw error;
    }
}