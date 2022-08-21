function displayTemperature(response) {
    console.log(response.data);
    let tempElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    tempElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
}


let apiKey = "95a0279efa62b6e7d0fd1891ab7005da";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Nairobi&appid=95a0279efa62b6e7d0fd1891ab7005da&units=metric";

console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);




