let text=document.getElementById("txt");
let btn1=document.getElementById("grantBtn");
let btn2=document.getElementById("rejectBtn");
let audio=document.getElementById("audio");
let audio2=document.getElementById("audio2");

// 哭泣SVG动画相关变量
let cryIndex = 0;
let cryInterval;
const cryImages = ['../img/哭泣0.svg', '../img/哭泣1.svg', '../img/哭泣2.svg'];

// 设置拒绝按钮的悬停效果
function setupRejectButtonHover() {
    const rejectBtn = document.getElementById('rejectBtn');
    const svgImage = rejectBtn.querySelector('svg image');
    
    rejectBtn.addEventListener('mouseenter', function() {
        // 开始哭泣动画
        cryIndex = 0;
        cryInterval = setInterval(function() {
            svgImage.setAttribute('href', cryImages[cryIndex]);
            cryIndex = (cryIndex + 1) % cryImages.length;
        }, 300); // 每300ms切换一次
    });
    
    rejectBtn.addEventListener('mouseleave', function() {
        // 停止哭泣动画，恢复为拒绝.svg
        clearInterval(cryInterval);
        svgImage.setAttribute('href', '../img/拒绝.svg');
    });
}

setTimeout(function(){
	
	 text.style.display = "block";
	 audio.play();
	 let txt=document.getElementById("txt");
	 		     let str="庄皖珍小姐你是否愿意与晨先生结为恋人关系，无论贫穷或富有，健康或疾病，永远陪伴着彼此。";
	 		     let i=0;
	 		     let timer=setInterval(function(){
	 		       txt.innerHTML+=str[i];
	 		       i++;
	 		       if(i==str.length){
					   document.body.style.background="url('../img/contract.png') no-repeat center/cover";
					   btn1.style.display = "block";//显示按钮
					   btn2.style.display = "block";//显示按钮
					   
					   // 设置拒绝按钮的悬停效果
					   setupRejectButtonHover();
					   
					   btn1.onclick = function() {
					   window.location.href="heart.html"
					   };
					   btn2.onclick = function() {
					   window.location.href="request.html"
					   };
	 		         clearInterval(timer);
					 audio.pause();
	 		       }
	 		     },200);
},1000);

 