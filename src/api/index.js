import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => { 
    let changeableUrl = url;

    if(country){
        changeableUrl = `${url}/countries/${country}`;
    }

try{
    const {data: { confirmed, recovered, deaths, lastUpdate }} = await axios.get(changeableUrl);


    // const modifiedData = {
    //     confirmed: confirmed,
    //     recovered: recovered,
    //     deaths: deaths,
    //     lastUpdated: lastUpdated,
    // }


    return {confirmed, recovered, deaths, lastUpdate };
    // console.log(response);
    
}
catch (error){
    console.log(error);
}

}

export const fetchDailyData = async () =>{
    try{

        const {data} = await axios.get(`${url}/daily`);

        // console.log(data);
        const modifiedData = data.map((dailyData) =>({
            confirmed: dailyData.confirmed.total,

            //trying ----------------------------------------
            recovered: dailyData.recovered.total,
            //----------------------------------------------

            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifiedData;
    }
    catch(error){

    }

} 

export const fetchCountries = async () =>{
    try{
        const {data:{countries}} = await axios.get(`${url}/countries`);
        return countries.map((countries) => countries.name)
    }
    catch(error) {
        console.log(error);

    }
}