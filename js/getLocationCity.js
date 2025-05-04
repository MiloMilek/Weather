export async function getCity(lat, lon){
    const api_key = "";
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${api_key}`);
    if(response.ok){
        const data = await response.json();
        console.log(data);
        return data[0].name + ", " + data[0]["country"];
    } else {
        console.error("Reverse geocode failed: " + response.statusText);
        return null;
    }
}