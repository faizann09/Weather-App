const inputBox=document.getElementById('inputbar');
const search=document.getElementById('search');
const weather_img=document.querySelector(".weather-img");
const temp=document.querySelector(".temp");
const description=document.querySelector(".description");
const humidity=document.getElementById('humidity');
const wind=document.getElementById('wind-speed');
const location_not_found=document.querySelector(".location-not-found");
const weather_main=document.querySelector(".weather-body");

async function checkWeather(city){
    const api_key="070ef1e92d7c149ab6c1e33fd7180e0e";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data=await fetch(`${url}`).then(response=>response.json());

    if(weather_data.cod===`404`){
        location_not_found.style.display="flex";
        weather_main.style.display="none";
        console.log("Error");
        return;
    }
    else{
        location_not_found.style.display="none";
        weather_main.style.display="flex";
    }

    temp.innerHTML=`${Math.round(weather_data.main.temp-273.15)}°C`;
    description.innerHTML=`${weather_data.weather[0].description}`;
    humidity.innerHTML=`${weather_data.main.humidity}%`;
    wind.innerHTML=`${weather_data.wind.speed}km/H`;

    switch(weather_data.weather[0].main){
            case 'Clouds':
            weather_img.src="asset/cloud.png";
            break;
            case 'Clear':
            weather_img.src="asset/clear.png";
            break;
            case 'Rain':
            weather_img.src="asset/mist.png";
            break;
            case 'Mist':
            weather_img.src="asset/rain.png";
            break;
            case 'Snow':
            weather_img.src="asset/snow.png";
            break;
    }
}
search.addEventListener('click',()=>{
    checkWeather(inputBox.value);
})