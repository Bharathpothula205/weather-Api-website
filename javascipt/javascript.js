 let cityInput=document.querySelector('.city-input');
 let searchBtn=document.querySelector('.search-btn');
const apiKey='45ea3716d37734eb84a60c674e94b50f'
 searchBtn.addEventListener('click',() => {
    if(cityInput.value.trim()!=''){
   updateweatherInfo(cityInput.value);
    }
    cityInput.value='';
    cityInput.blur();
 })
 cityInput.addEventListener('keydown',(event)=>{
if(event.key==='Enter' && cityInput.value.trim()!=''){
   updateweatherInfo(cityInput.value);
    cityInput.value='';
    cityInput.blur();
}
 })
 function updateWeatherInfo(city){

 }