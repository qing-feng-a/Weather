let city = document.querySelector('.city-name')
let wendu = document.querySelector('.wea-temp')
let high = document.querySelector('.temps-high')
let low = document.querySelector('.temps-low')
let type = document.querySelector('.wea-sky')
let ganmao = document.querySelector('.city-AQI')
let time = document.querySelector('.time')
let dates = document.querySelector('.date')
let date = document.querySelector('.info-date')
let img = document.querySelector('.info-img')
let temp = document.querySelector('.info-temp')
let content = document.querySelector('.content')
// 
onCursur("citys","weather")
// getResult("citys","readonly","")
function setWeather(weatherData) {
  city.innerHTML = '<h1>' + weatherData.city + '</h1>'
  wendu.innerHTML = weatherData.wendu + '<span>℃</span>'

  high.innerHTML = weatherData.forecast[0].high.match(/\d+/g)
  low.innerHTML = weatherData.forecast[0].low.match(/\d+/g)
  type.innerHTML = weatherData.forecast[0].type +
    '  ' + weatherData.forecast[0].fengxiang
  ganmao.innerHTML = weatherData.ganmao
  time.innerHTML = `<h1>今日：<hr/>${weatherData.forecast[0].date.match(/\d+/)}号</h1>`
}

function setWeeks(weatherData) {
  let div = document.createElement('div')
  div.innerHTML = `<div class="info-weeks">
    <div class="info-date">${weatherData.yesterday.date}</div>
    <div class="info-img"></div>
    <div class="info-temp">${weatherData.yesterday.high.match(/\d+/g)}℃ / ${weatherData.yesterday.low.match(/\d+/g)}℃</div>
  </div>`
  div.style.opacity = '0.5'
  dates.appendChild(div)
  for (let i = 0; i < weatherData.forecast.length; i++) {
    let div = document.createElement('div')
    div.innerHTML = `<div class="info-weeks">
    <div class="info-date">${weatherData.forecast[i].date}</div>
    <div class="info-img"></div>
    <div class="info-temp">${weatherData.forecast[i].high.match(/\d+/g)}℃ / ${weatherData.forecast[i].low.match(/\d+/g)}℃</div>
  </div>`
    dates.appendChild(div)
  }
}

function setBackGround (weatherData) {
  console.log(weatherData.forecast[0].type);
  if (weatherData.forecast[0].type.indexOf('晴') !== -1) {
    content.style.background = 'url(img/bg1.jpg) no-repeat fixed'
    document.body.style.background = 'rgb(136, 186, 219)'
  } else
  if (weatherData.forecast[0].type.indexOf('雨') !== -1) {
    content.style.background = 'url(img/bg3.jpg) no-repeat fixed'
    document.body.style.background = 'rgb(6, 31, 62)'
  } else
  // if (weatherData.forecast[0].type.indexOf('云') !== -1)
    {
    content.style.background = 'url(img/bg2.jpg) no-repeat fixed'
    document.body.style.background = 'rgb(50, 62, 76)'
  }

}