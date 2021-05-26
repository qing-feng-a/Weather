let more = document.querySelector(".more")
let control = document.querySelector('.control')
let p = document.querySelectorAll('.control p')

more.addEventListener('click', function () {
  control.style.display = 'block'
  // GoTo("cityManager.html");
})
control.addEventListener('click',function (e) {
  console.log(e.target.tagName);
  if (e.target.tagName == 'P') {
    switch (e.target.innerText) {
      case '管理城市':
        GoTo("cityManager.html")
        break;
    }
  }
})
document.addEventListener('click', function (e) {
  console.log(e);
  if (e.target.className == 'control' || e.target.className == 'more') {
    // control.style.display = 'block'
    with (control.style) {
      height = '12.5rem'
    }

    p.forEach(item => item.style.display='block');
    // console.log(1);
    
  } else {
    with (control.style) {
      height = '0px'
      
    }
    p.forEach(item => item.style.display='none');
  }
}) 
