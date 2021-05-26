let input = document.getElementById('search');
let icon = document.querySelector('.search_icon')
let city = document.querySelector('.citys')
let citys = ['北京', '上海', '广州', '深圳', '天津', '武汉', '沈阳', '重庆',
  '杭州', '南京', '哈尔滨', '长春', '呼和浩特', '石家庄', '银川',
  '乌鲁木齐', '拉萨', '西宁', '西安', '兰州', '太原', '昆明',
  '南宁', '成都', '长沙', '济南',
  '南昌', '合肥', '郑州', '福州',
  '贵阳', '海口', '秦皇岛', '桂林', '三亚'];

// 存储数据库中的城市
let incity = []
let tag = 0
let back = document.querySelector('.back');
back.addEventListener('click', function () {
  if(tag || incity.length)
  GoTo("cityManager.html")
})
// 失去焦点自动查询
// input.addEventListener("blur", function () {
//   if (this.value.length > 0) {
//     searchCity(input.value)
//   }
// })

// 查询citys表中的数据，类型为add
onCursur("citys", "add")

// 判断选择的城市是否在数据库中，若存在修改样式
function exist (value) {
  let index = citys.indexOf(value)
    if (index != -1) {
      city.children[index].style.color = "rgba(255,255,255,.4)"
    }
}
// 监听查找图标的点击
icon.addEventListener('click', function () {
  if (input.value.length > 0) {
    exist(input.value)
    // 查找城市
    searchCity(input.value)
    tag = 1
    GoTo('cityManager.html')
  }
})
// 监听推荐城市列表的点击
city.addEventListener('click', function (e) {
  exist(e.target.innerText)
  searchCity(e.target.innerText)
  tag = 1
})
// 往页面添加城市
function append() {
  for (let i = 0; i < citys.length; i++) {
    let div = document.createElement('div');
    div.className = 'item';
    div.innerText = citys[i];
    // 先判断该城市是否已在数据库中，如果存在先改变样式再添加
    if (incity.indexOf(citys[i]) != -1) {
      div.style.color = "rgba(255,255,255,.4)"
    }
    city.appendChild(div);   
  }
}
// 遍历数据库中城市，获取以添加的城市
function appendedCity (cursor) {
  // 如果键不为空
  if (cursor) {
    // 将城市存进数组
    incity.push(cursor.key)
    // 查找下一个数组
    cursor.continue();
  } else
    // 开始生成页面
    append()
}

// pc端回车键判断
// document.addEventListener("keyup", function (e) {
//   if (e.key == "Enter" && input.value.length > 0) {
//     console.log(input.value);
//   }
// })