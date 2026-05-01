const balloonContainer = document.getElementById("balloon-container");

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var left = random(window.innerWidth);
  var dur = random(5) + 5;
  var delay = random(10);
  var zIndex = random(5) + 1;
  var scale = 0.7 + random(30) / 100;
  return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  left: ${left}px;
  z-index: ${zIndex};
  --scale: ${scale};
  animation: float ${dur}s ease-in ${delay}s infinite backwards
  `;
}

function createBalloons(num) {
  for (var i = num; i > 0; i--) {
    var balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();
    
    // 添加点击事件
    balloon.addEventListener('click', function() {
      toggleBalloonAnimation(this);
    });
    
    balloonContainer.append(balloon);
  }
}

function toggleBalloonAnimation(balloon) {
  if (balloon.style.animationPlayState === 'paused') {
    balloon.style.animationPlayState = 'running';
  } else {
    balloon.style.animationPlayState = 'paused';
  }
}


window.addEventListener("load", () => {
  createBalloons(25)
});
	function login() {
	  // 获取用户名和密码
	  var username = document.getElementById("username").value;
	  var password = document.getElementById("pwd").value;
	  console.log(username)
	  // 验证用户名和密码
	  if (username == "田贝贝" && (password == "1201" || password == "121")) {
	    // 跳转到欢迎页面
	    window.location.href = "./html/meetingdays.html";
	  } else {
	    // 显示错误信息
	    alert("喜欢的人的名字和生日！");
	  }
	}
	function register(){
		 alert("心里已经有人了，装不下别人啦！");
	}