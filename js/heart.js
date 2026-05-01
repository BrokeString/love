    // 目标日期，格式为：年-月-日 时:分:秒
    var target = new Date("2026/03/16 00:00:00");

    // 获取系统当前时间
    var now = new Date(2026, 3, 23, 10, 29,24);

    // 格式化时间为年月日时分秒
    var formatTime = function(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      // 补零
      var padZero = function(num) {
        return num < 10 ? "0" + num : num;
      };
      return year + "年" + padZero(month) + "月" + padZero(day) + "日" + padZero(hour) + "时" + padZero(minute) + "分" + padZero(second) + "秒";
    };
    // 显示时间在页面上
    var timeElement = document.getElementById("time");
    timeElement.innerHTML = formatTime(now);
    // 计算从进入页面到当前的时间差
    var durationElement = document.getElementById("duration");
    var updateDuration = function() {
      // 获取当前时间
      var current = new Date();
      // 计算时间差，单位是毫秒
      var diff = current - now;
      // 转换为秒
      diff = Math.floor(diff / 1000);
	  var day=Math.floor(diff / 3600 / 24);
      // 计算时分秒
      var hour = Math.floor(diff / 3600 % 24);
      var minute = Math.floor(diff / 60 % 60);
      var second = diff % 60;
	   // 显示在页面上
	   document.getElementById("days").innerText = Math.floor(day);
	   document.getElementById("hours").innerText = Math.floor(hour);
	   document.getElementById("minutes").innerText = Math.floor(minute);
	   document.getElementById("seconds").innerText = Math.floor(second);
	  
     
     
    };
    // 每隔一秒更新一次时间差
    setInterval(updateDuration, 1000);
    // 在页面最下面显示距离第一次进入页面的秒数乘以1.7的值
    var countElement = document.getElementById("count");
    var updateCount = function() {
		var current = new Date();
		// 计算时间差，单位是毫秒
		var diff = current - now;
		var second = Math.floor(diff / 1000);
		
      //秒乘以1.7
       var count = Math.floor(second*1.7);
       countElement.innerHTML =count;
    };
	setTimeout(updateCount,1);
    // 每隔1.7秒更新一次计数值
    setInterval(function(){
		countElement.innerHTML++;
	}, 588.235);