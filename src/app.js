function formatDate (timestamp) {
     let date = new Date(timestamp); 
     let hours = date.getHours();
     if (hours < 10) {
        hours = "0" + hours;
     }
     let minutes = date.getMinutes();
     if (minutes < 10) {
        minutes = "0" + minutes;
     }
     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     let day = days[date.getDay()];
     
    return day + " " + hours + ":" + minutes;
    
}
 function displayForecast (response) {
  console.log(response.data.daily);
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;

    let days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday"];
    days.forEach(function(day){
        forecastHTML  = forecastHTML + 
                `<div class="col-2">
                  <div class="weather-forecast-date">${day}</div>
                  <img
                    src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                    alt=""
                    width="36"
                  />
                  <div class="weather-forecast-temperature">
                    <span class="high">20</span>/<span class="low">15</span>
                  </div>
                </div>
                 </div>
            </div>`;


    })

    
    
            forecastHTML = forecastHTML + `</div>`;
            forecastElement.innerHTML = forecastHTML;
                
 }

 function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "95a0279efa62b6e7d0fd1891ab7005da";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
 }

function displayTemperature(response) {

    let tempElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celciusTemperature = response.data.main.temp;


    tempElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    
 getForecast(response.data.coord);
}


function search(city) {
let apiKey = "95a0279efa62b6e7d0fd1891ab7005da";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}
 
function handleSubmit(event) {
    event.preventDefault();
    let cityName = document.querySelector("#search-result");
    search(cityName.value);
}
    

function displayImperialTemperature(event) {
    event.preventDefault();
    let imperialTemperature = (celciusTemperature * 9/5) + 32 ;
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = Math.round(imperialTemperature);
}

function displayCelciusTemperature(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;




let imperialTemperature = document.querySelector("#fh-link");
imperialTemperature.addEventListener("click", displayImperialTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Nairobi");

