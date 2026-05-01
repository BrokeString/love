// Canvas爱心效果
const canvas = document.getElementById('petalCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const TOTAL = 38;
const heartArray = [];

// 初始隐藏Canvas，在手写动画期间再显示
canvas.style.display = 'none';

function render() {
  if (canvas.style.display !== 'block') return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  heartArray.forEach(heart => heart.animate());
  window.requestAnimationFrame(render);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let mouseX = 0;
function touchHandler(e) {
  mouseX = (e.clientX || e.touches[0].clientX) / window.innerWidth;
}
window.addEventListener('mousemove', touchHandler);
window.addEventListener('touchmove', touchHandler);

// Heart class
class Heart {
  constructor() {
    this.centerX = Math.random() * canvas.width;
    this.centerY = Math.random() * canvas.height;
    this.size = 5 + Math.random() * 8; // 更小的爱心
    this.opacity = 0.3 + Math.random() * 0.7;
    this.angle = Math.random() * Math.PI * 2;
    this.angleSpeed = 0.005 + Math.random() * 0.01; // 更慢的旋转
    this.radius = 10 + Math.random() * 20; // 更小的浮动半径
    this.time = Math.random() * Math.PI * 2;
    this.timeSpeed = 0.005 + Math.random() * 0.01; // 更慢的浮动速度
  }

  drawHeart(x, y, size, opacity) {
    ctx.globalAlpha = opacity;
    ctx.fillStyle = '#f2a0a1';
    ctx.beginPath();
    // 标准爱心形状绘制
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x + size * 0.5, y - size * 0.5, 
      x + size, y, 
      x + size, y + size * 0.3
    );
    ctx.bezierCurveTo(
      x + size, y + size * 0.6, 
      x, y + size * 1.1, 
      x, y + size * 1.1
    );
    ctx.bezierCurveTo(
      x, y + size * 1.1, 
      x - size, y + size * 0.6, 
      x - size, y + size * 0.3
    );
    ctx.bezierCurveTo(
      x - size, y, 
      x - size * 0.5, y - size * 0.5, 
      x, y
    );
    ctx.fill();
  }

  draw() {
    // 计算浮动位置
    this.time += this.timeSpeed;
    this.x = this.centerX + Math.sin(this.time) * this.radius * 0.5;
    this.y = this.centerY + Math.cos(this.time) * this.radius * 0.3;
    
    // 旋转效果
    this.angle += this.angleSpeed;
    
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    this.drawHeart(0, 0, this.size, this.opacity);
    ctx.restore();
  }

  animate() {
    // 鼠标影响浮动
    this.centerX += (mouseX - 0.5) * 0.5;
    this.draw();
  }
}

// 初始化爱心
for (let i = 0; i < TOTAL; i++) {
  heartArray.push(new Heart());
}

// 手写动画
const pencilAudio = document.getElementById('pencilAudio');
const audio = document.getElementById('audio');
const audio1 = document.getElementById('audio1');
const audio2 = document.getElementById('audio2');
const audio3 = document.getElementById('audio3');
const txt = document.getElementById('txt');
const btn = document.getElementById('getOn');

// 初始化第四站动画
function initFourthStationAnimation() {
    // 暂停背景音乐
    audio.pause();
    
    // 开始播放pencil音频
    pencilAudio.currentTime = 0;
    pencilAudio.play().catch(e => console.error('Audio play failed:', e));
    
    // 初始化每个字的手写动画
    const diWriter = HanziWriter.create('di', '第', {
        width: 200,
        height: 200,
        showOutline: false,
        strokeAnimationDuration: 160, // 加快5倍速度
        delayBetweenStrokes: 20,
        strokeColor: '#ff6b9d',
        strokeWidth: 10,
        showCharacter: false
    });
    
    const siWriter = HanziWriter.create('si', '四', {
        width: 200,
        height: 200,
        showOutline: false,
        strokeAnimationDuration: 80, // 加快5倍速度
        delayBetweenStrokes: 20,
        strokeColor: '#ff6b9d',
        strokeWidth: 10,
        showCharacter: false
    });
    
    const zhanWriter = HanziWriter.create('zhan', '站', {
        width: 200,
        height: 200,
        showOutline: false,
        strokeAnimationDuration: 240, // 加快5倍速度
        delayBetweenStrokes: 20,
        strokeColor: '#ff6b9d',
        strokeWidth: 10,
        showCharacter: false
    });
    
    // 按顺序执行手写动画
    diWriter.animateCharacter().then(() => {
        siWriter.animateCharacter().then(() => {
            zhanWriter.animateCharacter().then(() => {
                // 手写完成，停止pencil音频
                pencilAudio.pause();
                
                // 给文字添加炫酷效果
                document.querySelectorAll('#hanzi-container > div').forEach(div => {
                    div.classList.add('cool-effect');
                });
                
                // 添加"（终站）"文字，带淡入效果
                const hanziContainer = document.getElementById('hanzi-container');
                const endStationSpan = document.createElement('span');
                endStationSpan.textContent = "（终站）";
                endStationSpan.style.fontSize = '40px';
                endStationSpan.style.color = '#ff6b9d';
                endStationSpan.style.fontFamily = 'Arial, sans-serif';
                endStationSpan.style.opacity = '0'; // 初始透明
                endStationSpan.style.transition = 'opacity 1.5s ease-in-out'; // 淡入过渡
                endStationSpan.style.whiteSpace = 'nowrap'; // 避免换行
                endStationSpan.style.position = 'absolute'; // 绝对定位
                endStationSpan.style.left = 'calc(50% + 320px)'; // 定位在第四站文字右侧
                endStationSpan.style.top = '50%'; // 垂直居中
                endStationSpan.style.transform = 'translateY(-50%)'; // 垂直居中调整
                document.body.appendChild(endStationSpan);
                endStationSpan.classList.add('cool-effect');
                
                // 延迟显示"终站"文字，实现由虚到实的效果
                setTimeout(() => {
                    endStationSpan.style.opacity = '1';
                }, 300);
                
                // 2秒后跳转到四季场景，确保淡入效果完全完成
                setTimeout(() => {
                    // 隐藏手写体容器、Canvas花瓣和终站文字
                    document.querySelector('.handwriting-wrapper').style.display = 'none';
                    canvas.style.display = 'none';
                    // 隐藏终站文字
                    const endStationSpan = document.querySelector('span');
                    if (endStationSpan) {
                        endStationSpan.style.display = 'none';
                    }
                    
                    // 设置四季背景
                    document.body.style.background = "url('../img/四季.gif') no-repeat center/cover";
                    
                    // 播放键盘音效
                    if (audio1) {
                        audio1.currentTime = 0;
                        audio1.play().catch(e => console.error('Audio play failed:', e));
                    }
                    
                    // 显示文字
                    txt.style.display = 'block';
                    
                    let str = "想与你慢度这人间，尝人生百态，品四季冷暖";
                    let i = 0;
                    let timer = setInterval(() => {
                        txt.innerHTML += str[i];
                        i++;
                        if (i == str.length) {
                            clearInterval(timer);
                            if (audio1) audio1.pause();
                        }
                    }, 200);
                    
                    // 播放美人鱼音乐
                    if (audio2) {
                        audio2.currentTime = 0;
                        audio2.play().catch(e => console.error('Audio play failed:', e));
                    }
                    
                    // 15.2秒后跳转到下车场景，调整时间以保持整体流程一致
                    setTimeout(() => {
                        document.body.style.background = "url('../img/下车.gif') no-repeat center/cover";
                        if (audio3) {
                            audio3.currentTime = 0;
                            audio3.play().catch(e => console.error('Audio play failed:', e));
                        }
                        btn.style.display = "block"; // 显示按钮
                        btn.onclick = function() {
                            window.location.href = "platform5.html";
                        };
                    }, 15200);
                }, 2000);
            });
        });
    });
}

// 4秒后开始第四站动画
setTimeout(() => {
    // 更改背景为#f5ad8f
    document.body.style.background = '#f5ad8f';
    
    // 显示手写体容器和Canvas花瓣
    document.querySelector('.handwriting-wrapper').style.display = 'block';
    canvas.style.display = 'block';
    // 开始渲染花瓣
    render();
    
    // 初始化第四站动画
    initFourthStationAnimation();
}, 4000);
