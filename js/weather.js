
import { getLocation } from "./location.js";

import { getCity } from "./getLocationCity.js";

const api_key = "";
let api_query = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const icon = document.getElementById('icon');

export async function getWeather(lat = null, long = null){
    try{
        let coords;
        if(lat && long){
            coords = [lat, long];
        } else {    
            coords = await getLocation();
        }
        
        const full_query = `${api_query}&lat=${coords[0]}&lon=${coords[1]}&appid=${api_key}`;
        const response = await fetch(full_query);
        if(response.ok){
            const data = await response.json();
            console.log(data);
            cityName.textContent = await getCity(coords[0], coords[1]);
            let curr = 0;
            let intervalT = setInterval(()=>{
                if(curr < Math.round((data["main"]["temp"] + Number.EPSILON) * 10) / 10){
                    curr += 0.2;
                    temperature.innerHTML = Math.round((curr + Number.EPSILON) * 10) / 10 + "&deg;C";
                } else{
                    clearInterval(intervalT);
                    temperature.innerHTML = Math.round((data["main"]["temp"] + Number.EPSILON) * 10) / 10 + "&deg;C";
                }
            }, 10);
            let currH = 0;
            let intervalH = setInterval(()=>{
                if(currH < data['main']['humidity']){
                    currH += 1;
                    humidity.textContent = currH + "%";
                } else{
                    clearInterval(intervalH);
                    humidity.textContent = data['main']['humidity'] + "%";
                }
            }, 10);
            let currW = 0;
            let intervalW = setInterval(()=>{
                if(currW < Math.round((data['wind']['speed'] + Number.EPSILON) * 10) / 10){
                    currW += 0.1;
                    wind_speed.textContent = Math.round((currW + Number.EPSILON) * 10) / 10 + " km/h";
                } else {
                    clearInterval(intervalW);
                    wind_speed.textContent = Math.round((data['wind']['speed'] + Number.EPSILON) * 10) / 10 + " km/h";
                }
            })
            icon.src=`http://openweathermap.org/img/wn/${data['weather'][0]['icon']}@4x.png`;
        } else {
            console.log("fuck you " + response.statusText);
        }
    }
    catch(error){
        console.log(error);
    }
}