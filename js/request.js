
function searchCity (city) {
  axios.get('http://wthrcdn.etouch.cn/weather_mini?city='+city).then(res => {
    weatherData = res.data.data
    // console.log(weatherData);
    if (weatherData) {
      // tag = 1
      GoTo('cityManager.html')
      // 将查找的城市信息添加进数据库中
      addRecord("citys", "readwrite", weatherData)
    } else {
      console.log("查无此类");
    }
});
}


