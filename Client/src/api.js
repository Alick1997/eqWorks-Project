
const baseUrl = 'https://prong-beneficial-grandiflora.glitch.me';
/**
 * Fetches daily events. returns a promise which will return json obj if fulfilled
 */
export async function getDailyEvents(){

    try{
        const res = await fetch(`${baseUrl}/events/daily`)
        
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
        const res = await fetch(baseUrl+'/events/hourly')
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
        const res = await fetch(baseUrl+'/stats/daily')
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
        const res = await fetch(baseUrl+'/stats/hourly')
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
        const res = await fetch(baseUrl+'/poi')
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
        const res = await fetch(`${baseUrl}/poi/events${id}`);
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
        const res = await fetch(`${baseUrl}/poi/stats${id}`);
        return await res.json();
    }catch(error){
        throw error;
    }
}