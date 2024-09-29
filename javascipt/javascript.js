 let cityInput=document.querySelector('.city-input');
 let searchBtn=document.querySelector('.search-btn');
 const weatherInfo=document.querySelector('.weather-info');
 const notFoundSection=document.querySelector('.not-found');
 const searchCity=document.querySelector('.search-city')

 const countryTxt=document.querySelector('.country-txt')
 const tempTxt=document.querySelector('.temp-txt')
 const conditionTxt=document.querySelector('.condition-txt')
 const humidityValueTxt=document.querySelector('.humidity-value-txt')
 const windValueTxt=document.querySelector('.wind-value-txt')
const weatherSummaryImg=document.querySelector('.summary-img')
const currentDateTxt=document.querySelector('.current-date-txt')

const forecastItemsContainer=document.querySelector('.forecast-items-container')

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
 function getWeather(id){
if(id<=232) return 'thunderstorm.svg'
if(id<=321) return 'drizzle.svg'
if(id<=531) return 'rain.svg'
if(id<=622) return 'snow.svg'
if(id<=781) return 'atmosphere.svg'
if(id<=800) return 'clear.svg'
else return 'clouds.svg'
 }
 function getCurrentDate(){
   const currentDate=new Date()
   const options={
      weekday:'short',
      day:'2-digit',
      month:'short'
   }
   return currentDate.toLocaleDateString('en-GB',options)
 }
async function updateWeatherInfo(city){
const weatherData=await getFetchData('weather',city);
if(weatherData.cod!=200){
   showDisplaySection(notFoundSection)
   return
}
const{
   name:country,
   main:{temp,humidity},
   weather:[{id,main}],
   wind:{deg,speed}
}=weatherData

countryTxt.textContent=country;
tempTxt.textContent=Math.round([(temp-32)*5]/9)+' °C'
conditionTxt.textContent=main
humidityValueTxt.textContent=humidity+'%'
windValueTxt.textContent=speed+' M/s'
currentDateTxt.textContent=getCurrentDate();
weatherSummaryImg.src=`assets/weather/${getWeather(id)}`
await updateForecastsInfo(city)
showDisplaySection(weatherInfo);
 }
 async function updateForecastsInfo(city){
   const forecastsData=await getFetchData('forecast',city)
   const timeTaken='12:00:00'
   const todayDate=new Date().toISOString().split('T')[0]

   forecastItemsContainer.innerHTML=''
   forecastsData.list.forEach(forecastWeather =>{
      if(forecastWeather.dt_txt.includes(timeTaken) && !forecastWeather.dt_txt.includes(todayDate)){
      updateForecastItems(forecastWeather)
      }
   })
}
  function updateForecastItems(weatherData){
const{
   dt_txt:date,
   weather:[{id}],
   main:{temp}
}=weatherData

const dateTaken =new Date(date)
const dateOption={
   day:'2-digit',
   month:'short'
}
const dateResult=dateTaken.toLocaleDateString('en-Us',dateOption)

const forecastItem=`<div class="forecast-items">
   <p class="forecast-items-date regular-txt">${dateResult}</p>
   <img class="forecast-items-img" src="/assets/weather/${getWeather(id)}">
   <p class="forecast-items-temp">${Math.round([(temp-32)*5]/9)}°C</p>
  </div`
  forecastItemsContainer.insertAdjacentHTML('beforeend',forecastItem)

 }
 function showDisplaySection(section){
   [weatherInfo,notFoundSection,searchCity]
   .forEach(section => section.style.display='none')
      section.style.display='flex';
 }