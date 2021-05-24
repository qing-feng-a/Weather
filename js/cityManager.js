let flag = 1
onCursur("citys", "manager")
// 获取到表中的城市
function Manager (cursor) {
  let main = document.querySelector('.main')
  
  // 遍历城市，生成相应的元素并添加展示
  if (cursor) {
    let item = document.createElement('div')
    item.className = 'item'
    item.innerHTML = `
    <div class="city">${cursor.value.city}</div>
    <div class="info">
    <div class="temp">${cursor.value.wendu}℃</div>
    <div class="type">${cursor.value.forecast[0].type}</div>
    </div>
    `
    if (cursor.value.city == localStorage.getItem('city')) {
      flag = 0
      item.classList.add('select')
      console.log(localStorage.getItem('city'));
    }
    main.append(item)
    cursor.continue();
  } else {
    if (flag) {
      console.log('-----'+localStorage.getItem('city'));
      let city = main.children[0].children[0].innerText
      localStorage.setItem('city',city)
      main.children[0].classList.add('select')
      
    }
    
    // console.log();
  }
}
// 由于从数据库获取数据是异步操作，所以暂缓一段时间
setTimeout(() => {
  let main = document.querySelector('.main')
  // 长按时间
  let date1 = 0
  main.addEventListener('click', function (e) {
    // 进行选择操作
    let city = e.target.childNodes[1].innerText;
    for (let i = 0; i < main.children.length; i++) {
      main.children[i].classList.remove('select')
    }
    e.target.classList.add('select')
    // getResult("citys", "readonly", city)
    localStorage.setItem('city',city)
    // setCity(city)
  })
  // 开始长按
  main.addEventListener("touchstart", function (e) {
    let time = setInterval(() => {
      date1++
      // 长按时间超过0.4s进入编辑界面
      if (date1 > 4) {
        // 计时清零
        date1 = 0
        clearInterval(time)
        GoTo("editCity.html")
      }
    }, 100);
    // 长按结束，未超过0.4s
    main.addEventListener("touchend", function () {
      date1 = 0
      clearInterval(time)
    })
  })
}, 60);

let add = document.querySelector('.add')
add.addEventListener('click', function () {
  // window.location.href = "editCity.html"
  GoTo("addCity.html")
})
let back = document.querySelector('.back')
back.addEventListener('click', () => {
  GoTo("weather.html")
})