let cancle = document.querySelector('.cancle')
let check = document.querySelector('.check')
let main = document.querySelector('.main')
let list = []

// 取消案件和确定案件返回管理界面
cancle.addEventListener('click', () => {
  GoTo("cityManager.html")
})
// 点击确认后，如果list里有城市，则将其从数据库中删除
check.addEventListener('click', () => {
  if (list.length > 0) {
    list.forEach(item=>delRecord("citys","readwrite",item))
  }
  if (main.children.length == 0) {
    localStorage.removeItem('city')
    GoTo("addCity.html");
  }
  else
    GoTo("cityManager.html")
})

onCursur("citys", "edit")
// 遍历数据库内城市，生成相应的元素并展示
function Edit (cursor) {
  if (cursor) {

    let item = document.createElement('div')
    item.className = 'item'
    item.innerHTML = `
    <div class="city">
      <div class="select">=</div>
      <div class="cityname">${cursor.value.city}</div>
    </div>
    <div class="info">
      <div class="temp">${cursor.value.wendu}℃</div>
      <div class="type">${cursor.value.forecast[0].type}</div>
      <img src="img/delete.png" alt="${cursor.value.city}" class="delete">
    </div>
    `
    main.append(item)
    cursor.continue()
  } else {
    // 页面生成苟监听删除点击，并将要移除的城市添加到list里
    main.addEventListener('click', function (e) {
    let city
    if (city = e.toElement.alt) {
      main.removeChild(e.target.parentNode.parentNode)
      list.push(city)
    }
  })
  }
}

