let now = new Date();
let h2 = document.querySelector("h2");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let day = days[now.getDay(1)];
let months = ["Jan", "Feb","Mar","Apr","May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
let month = months[now.getMonth(3)];

h2.innerHTML=`${day} ${hours}:${minutes}`

function search(event){
event.preventDefault();
let searchInput = document.querySelector("#search-text-input");
let current = document.querySelector("current-text-input");
let apiKey="33cf8be18c8c070ad4040b123d2c56e2";
let units = "metric";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
let apiUrl= `${apiEndpoint}?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
let h1 = document.querySelector("h1");
if(searchInput.value){
    h1.innerHTML = `${searchInput.value}`;
    function showWeather(response){
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    let description = document.querySelector("#temperature-description");
    description.innerHTML = response.data.weather[0].description;
    let wind = document.querySelector("#wind");
    wind.innerHTML = ` Wind is ${Math.round(response.data.wind.speed)}m/s ${response.data.wind.deg}°`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML =`Humidity is ${response.data.main.humidity}%`;
    let pressure = document.querySelector("#pressure");
    pressure.innerHTML =`Pressure is ${response.data.main.pressure}hPa`;
    temperatureElement.innerHTML = `${temperature}°C`;
}
axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather); 
}
else{
    h1.innerHTML = null;
}
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
function show(){
function showTemperature(response) {
console.log(response.data.main.temp);
let temperature = Math.round(response.data.main.temp);
let wind = document.querySelector("#wind");
wind.innerHTML = ` Wind is ${Math.round(response.data.wind.speed)}m/s ${response.data.wind.deg}°`;
let humidity = document.querySelector("#humidity");
humidity.innerHTML =`Humidity is ${response.data.main.humidity}%`;
let pressure = document.querySelector("#pressure");
pressure.innerHTML =`Pressure is ${response.data.main.pressure}hPa`;
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML  = `${temperature}°C`;
let description = document.querySelector("#temperature-description");
description.innerHTML = response.data.weather[0].description;
let h1 = document.querySelector("h1");
h1.innerHTML = response.data.name;
}

function handlePosition(position) {
console.log(position.coords.latitude);
console.log(position.coords.longitude);
let units = "metric";
let longitude = position.coords.longitude;
let latitude = position.coords.latitude;
let apiKey = "907fef83425ee6575ce345a2f87d8989";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
let apiUrl = `${apiEndpoint}?lat=${latitude}
&lon=${longitude}&appid=${apiKey}&units=${units}`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(handlePosition);
}
let button = document.querySelector("#current");
button.addEventListener("click", show);
