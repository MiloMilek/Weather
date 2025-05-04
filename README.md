# Weather

A pretty basic weather app. Nothing too crazy.

Upon opening the site, shows the user's current location (which can be clanky due to browser restrictions, might show a default location, such as Washington US). The panel showcases the current weather in the city, as well as the temperature, humidity and wind speed in metric units (Celcius, meters, and km/h).

The user has access to a search bar on the top of the main container, which searches for a city closest matching to the one the user put in. (NOTE: IT CAN BE CLANKY SOMETIMES. USING THE NATIVE LANGUAGE FOR THE CITY NAME IS RECOMMENDED. EXAMPLE: KRAKÓW - WORKS. CRACOW - Banana Shire, AU)

If the city happens to be seaside, an additional panel shows itself, giving information about the current sea temperature, average sea temperature for the day, and wave height.

API's used

- openweathermap - geocode, weather
- marine weather API - sea information

Marine Weather API requires no API key. 
For obvious reasons, this repository does not contain my Openweathermap API key. You can obtain yours by signing up at https://openweathermap.org/, and placing it in the api_key variable in geocode.js, getLocationCity.js, weather.js (Yes normally I should've attempted to fetch the API key from an .env file, however since this is a small personal project, it isn't (and won't be) my priority.)

For people looking at the spaghetti code, I'm just learning JS.
test6385 on discord