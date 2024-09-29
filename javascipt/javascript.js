 let cityInput=document.querySelector('.city-input');
 let searchBtn=document.querySelector('.search-btn');
 const weatherInfo=document.querySelector('.weather-info');
 const notFoundSection=document.querySelector('.not-found');
 const searchCity=document.querySelector('.search-city')
 console.log(searchBtn);
 console.log(weatherInfo)
 console.log(notFoundSection);
 console.log(searchCity);
const apiKey='45ea3716d37734eb84a60c674e94b50f'
 searchBtn.addEventListener('click',() => {
    if(cityInput.value.trim()!=''){
   updateWeatherInfo(cityInput.value);
    }
    cityInput.value='';
    cityInput.blur();
 })
 cityInput.addEventListener('keydown',(event)=>{
if(event.key==='Enter' && cityInput.value.trim()!=''){
   updateWeatherInfo(cityInput.value);
    cityInput.value='';
    cityInput.blur();
}
 })
async function getFetchData(endPoint,city){
   const apiUrl=`https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}`;
   const response=await fetch(apiUrl)
   return response.json();
 }
async function updateWeatherInfo(city){
const weatherData=await getFetchData('weather',city);
if(weatherData.cod!=200){
   showDisplaySection(notFoundSection)
   return
}
showDisplaySection(weatherInfo);
 }
 function showDisplaySection(section){
   [weatherInfo,notFoundSection,searchCity]
   .forEach(section => section.style.display='none')
      section.style.display='flex';
 }