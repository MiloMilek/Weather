let api_query = "http://api.openweathermap.org/geo/1.0/direct";
const api_key = "";

const cityName = document.getElementById("city-name");

export async function geocode(city = null){
    try{
        if(city){
            const full_query = `${api_query}?q=${encodeURIComponent(city)}&limit=1&appid=${api_key}`;
            const response = await fetch(full_query);
            if(response.ok){
                const result = await response.json();
                console.log(result);
                cityName.textContent = result[0]["name"] + ", " + result[0]["country"];
                return result;
            } else {
                console.log("haha no city for u " + response.statusText);
            }
        }
    }   
    catch(error){
        console.log("haha fuck you");
    }
}