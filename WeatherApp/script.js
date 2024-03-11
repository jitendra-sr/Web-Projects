let inp=document.querySelector(".search input");
let btn=document.querySelector(".search button");
let icon=document.querySelector(".weather-icon");
const apiKey="fd34267afab988fbd1bd9be6f1a46a19";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
async function getInfo(city){
    let res=await fetch(apiUrl+city+`&appid=${apiKey}`);
    if(res.status==404){
        document.querySelector('.error').style.display='block';
        document.querySelector('.weather').style.display='none';
    }
    else{
        let data=await res.json();
        console.log(data);
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°C";
        document.querySelector(".humidity").innerHTML=data.main.humidity+" %";
        document.querySelector(".wind").innerHTML=data.wind.speed+" km/hr";
        let pic=data.weather[0].main;
        if(pic=='Clouds') icon.src='images/clouds.png';
        else if(pic=='Clear') icon.src='images/clear.png';
        else if(pic=='Rain') icon.src='images/rain.png';
        else if(pic=='Drizzle') icon.src='images/drizzle.png';
        else if(pic=='Mist') icon.src='images/mist.png';
        document.querySelector('.weather').style.display='block';
        document.querySelector('.error').style.display='none';
    }
}
btn.addEventListener('click',()=>{
    getInfo(inp.value);
})
inp.addEventListener('keypress',(event)=>{
    if(event.key=='Enter') getInfo(inp.value);
});