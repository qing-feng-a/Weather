let db, request, version = 1;
let cityname
// 创建数据库和表
// 数据库名，版本，表名，键名
initIndexedDB("citysInfo", version, "citys", "city")
function initIndexedDB(dbname, version, storeName, key) {
  request = indexedDB.open(dbname, version);
  request.onerror = (e) => {
    console.log(`错误：${request.errorCode}`)
  }
  request.onsuccess = (e) => {
    db = request.result;
  }
  request.onupgradeneeded = (e) => {
    db = request.result
    db.createObjectStore(storeName, {
      keyPath: key
    })
  }

}    
// 往表中添加数据
// 表名，打开类型，操作数据
function addRecord (objStore, method, objData) {
  const transaction = db.transaction([objStore], method)
  const store = transaction.objectStore(objStore)
  // 将数据存入表中
  let res = store.put(objData)
  res.onsuccess = (e) => {
    console.log("success")
  }
  res.onerror = (e) => {
    console.log("error");
  }
}    
// 读取表中对应键名的数据
// 表名，类型，键名
function getResult (objStore, method, name) {
  setTimeout(() => {
    const transaction = db.transaction([objStore], method)
    const store = transaction.objectStore(objStore)
    let res = store.get(name)
    res.onerror = (e) => {
      console.log("error");
    }
    res.onsuccess = (e) => {
      console.log("success");
      console.log(res.result);

      setBackGround(res.result)
      setWeather(res.result)
      setWeeks(res.result)
    }
  }, 50);
}
// 遍历表中数据，根据传入类型执行相应操作
function onCursur (objStore,type) {
  
  setTimeout(() => {
    const transaction = db.transaction([objStore])
    const store = transaction.objectStore(objStore)
    var res = store.openCursor()
    res.onerror = (e) => {
      console.log("error");
    }
    res.onsuccess = (e) => {
      
      const cursor = res.result;
      switch (type) {
        case "manager":
          // 执行的是管理界面的展示
          Manager(cursor)
          break;
        case "weather":
          // 执行的是主页面的展示
          cityname = localStorage.getItem('city')
          if (cityname == null) {
            cityname = cursor.key
            localStorage.setItem('city',cityname)
          }
          console.log(cityname);
          getResult("citys", "readonly", cityname)
          break;
        case "edit":
          // 执行的是编辑界面的操作
          Edit(cursor)
          break;
        case "add":
          // 执行添加页面的操作
          appendedCity(cursor);
          break;
      }
        
    }
  }, 30);
}
// 删除数据库中内容
function delRecord(objStore, method, name) {
  const transaction = db.transaction([objStore], method)
  const store = transaction.objectStore(objStore)
  // 删除
  var res = store.delete(name)
  res.onerror = (e) => {

  }
  res.onsuccess = (e) => {
  }
}

  // let citys = {
    //   data: {
    //     yesterday: {
    //       date: "22日星期六",
    //       high: "高温 35℃",
    //       fx: "南风",
    //       low: "低温 28℃",
    //       fl: "<![CDATA[3级]]>",
    //       type: "多云"
    //     },
    //     city: "",
    //     forecast: [{
    //       date: "23日星期天",
    //       high: "高温 35℃",
    //       fengli: "<![CDATA[3级]]>",
    //       low: "低温 27℃",
    //       fengxiang: "南风",
    //       type: "晴"
    //     }, {
    //       date: "24日星期一",
    //       high: "高温 33℃",
    //       fengli: "<![CDATA[2级]]>",
    //       low: "低温 26℃",
    //       fengxiang: "东风",
    //       type: "雷阵雨"
    //     }],
    //     ganmao: "感冒低发期，天气舒适，请注意多吃蔬菜水果，多喝水哦。",
    //     wendu: "34"
    //   },
    //   status: 1000,
    //   desc: "OK"
    // }
        // var add = document.querySelector(".add")
    // var get = document.querySelector(".get")
    // add.addEventListener("click", function () {
    //   addRecord("citys", "readwrite", citys.data)
    // })
    // get.addEventListener("click", function () {
    //   getResult("citys", "readonly", "广州")
    // })