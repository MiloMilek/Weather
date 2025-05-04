
import { getLocation } from "./location.js";
import { getCity } from "./getLocationCity.js";

const api_query = `https://marine-api.open-meteo.com/v1/marine?`

export async function getSea(lat = null, long = null){
    try{
        let coords;
        const today = new Date().toISOString().split("T")[0];
        let tWeek = new Date();
        tWeek.setDate(tWeek.getDate() + 7);
        const week = tWeek.toISOString().split("T")[0];
        const hour = new Date().getHours();
        const cityName = document.getElementById("city-name-sea");
        if(lat && long){
            coords = [lat, long];
        } else {
            coords = await getLocation();
        }

        const full_query = `${api_query}latitude=${coords[0]}&longitude=${coords[1]}&hourly=wave_height,sea_surface_temperature,ocean_current_velocity&start_date=${today}&end_date=${today}&timezone=auto`;

        const response = await fetch(full_query);

        if(response.ok){
            const data = await response.json();
            let sum = 0;
            console.log(data);
            const sec = document.querySelector("section");
            if(data['hourly']['sea_surface_temperature'][0] != null){
                for(let temp of data["hourly"]["sea_surface_temperature"]){
                    sum+=temp;
                }
                const avg = Math.round(((sum / data['hourly']['sea_surface_temperature'].length) + Number.EPSILON) * 10) / 10;
                console.log(`Average: ${avg}`)

                const sea_temp = document.getElementById("sea-temp");
                const sea_temp_avg = document.getElementById("sea-avg");
                const wave = document.getElementById("wave");

                let curr = 0;
                let intervalT = setInterval(()=>{
                    if(curr < data['hourly']['sea_surface_temperature'][hour-1]){
                        curr += 0.2;
                        sea_temp.innerHTML = Math.round((curr + Number.EPSILON) * 10) / 10 + "&deg;C";
                    } else{
                        clearInterval(intervalT);
                        sea_temp.innerHTML = data['hourly']['sea_surface_temperature'][hour-1] + "&deg;C";
                    }
                }, 10);
                let currA = 0;
                let intervalA = setInterval(()=>{
                    if(currA < avg){
                        currA += 0.2;
                        sea_temp_avg.innerHTML = Math.round((currA + Number.EPSILON) * 10) / 10 + "&deg;C";
                    } else{
                        clearInterval(intervalA);
                        sea_temp_avg.innerHTML = avg + "&deg;C";
                    }
                }, 10);
                let currW = 0;
                let intervalW = setInterval(()=>{
                    if(curr < data['hourly']['wave_height'][hour-1]){
                        currW += 0.1;
                        wave.innerHTML = Math.round((currW + Number.EPSILON) * 10) / 10 + " m";
                    } else{
                        clearInterval(intervalW);
                        wave.innerHTML = data['hourly']['wave_height'][hour-1] + " m";
                    }
                }, 10);
                cityName.textContent = await getCity(coords[0], coords[1]);
                sec.style.display = "flex";
            } else {
                sec.style.display = "none";
            }
        }
        else{
            console.log("getSea error: " + response.statusText);
        }
    }
    catch(error){
        console.log("getSea error: " + error);
    }
}
