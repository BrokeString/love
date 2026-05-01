// Canvas花瓣效果
const canvas = document.getElementById('petalCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const TOTAL = 50;
const petalArray = [];

// 初始隐藏Canvas，在手写动画期间再显示
canvas.style.display = 'none';

// 花瓣图像
const petalImg = new Image();
// 使用在线花瓣图片
petalImg.src = 'https://djjjk9bjm164h.cloudfront.net/petal.png';
petalImg.addEventListener('load', () => {
  for (let i = 0; i < TOTAL; i++) {
    petalArray.push(new Petal());
  }
  // 只有在显示时才开始渲染
  if (canvas.style.display === 'block') {
    render();
  }
});

function render() {
  if (canvas.style.display !== 'block') return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petalArray.forEach(petal => petal.animate());
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

// Petal class
class Petal {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = (Math.random() * canvas.height * 2) - canvas.height;
    this.w = 25 + Math.random() * 15;
    this.h = 20 + Math.random() * 10;
    this.opacity = this.w / 40;
    this.flip = Math.random();

    // 调整飘动范围，更大的随机性
    this.xSpeed = (Math.random() - 0.5) * 4; // 左右飘动
    this.ySpeed = 1 + Math.random() * 2; // 主要向下飘动
    this.flipSpeed = Math.random() * 0.03;
  }

  draw() {
    if (this.y > canvas.height || this.x > canvas.width || this.x < -this.w) {
      this.x = Math.random() * canvas.width;
      this.y = -this.h;
      this.xSpeed = (Math.random() - 0.5) * 4; // 左右飘动
      this.ySpeed = 1 + Math.random() * 2; // 主要向下飘动
      this.flip = Math.random();
    }
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(
      petalImg, 
      this.x, 
      this.y, 
      this.w * (0.6 + (Math.abs(Math.cos(this.flip)) / 3)), 
      this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 5))
    );
  }

  animate() {
    // 调整飘动方向，不只是从左上到右下
    this.x += this.xSpeed + (mouseX - 0.5) * 3; // 鼠标影响左右飘动
    this.y += this.ySpeed; // 主要向下飘动
    this.flip += this.flipSpeed;
    this.draw();
  }
}

// 手写动画
const pencilAudio = document.getElementById('pencilAudio');
const audio = document.getElementById('audio');
const audio1 = document.getElementById('audio1');
const audio2 = document.getElementById('audio2');
const getOnBtn = document.getElementById('getOn');

// 预加载音频文件
function preloadAudio() {
    // 为每个音频元素创建一个新的Audio对象来预加载
    const audioFiles = [
        '../music/keyboard.mp3',
        '../music/bohu.mp3',
        '../music/pencil.mp3'
    ];
    
    audioFiles.forEach(src => {
        const audioElement = new Audio();
        audioElement.src = src;
        audioElement.preload = 'auto';
        // 触发加载
        audioElement.load();
    });
}

// 页面加载完成后预加载音频
window.addEventListener('load', preloadAudio);

// 第三站文字动画
function initThirdStationAnimation() {
    // 隐藏h1元素
    document.getElementById('txt').style.display = 'none';
    
    // 播放铅笔音效
    if (pencilAudio) {
        pencilAudio.play();
    }
    
    // 初始化"第"字
    const diWriter = HanziWriter.create('di', '第', {
        width: 200,
        height: 200,
        showOutline: false,
        strokeAnimationDuration: 160,
        strokeColor: '#ff6b9d',
        radicalColor: '#ff6b9d',
        strokeWidth: 10,
        delayBetweenStrokes: 20,
        showCharacter: false
    });
    
    // 初始化"三"字
    const sanWriter = HanziWriter.create('san', '三', {
        width: 200,
        height: 200,
        showOutline: false,
        strokeAnimationDuration: 80,
        strokeColor: '#ff6b9d',
        radicalColor: '#ff6b9d',
        strokeWidth: 10,
        delayBetweenStrokes: 20,
        showCharacter: false
    });
    
    // 初始化"站"字
    const zhanWriter = HanziWriter.create('zhan', '站', {
        width: 200,
        height: 200,
        showOutline: false,
        strokeAnimationDuration: 240,
        strokeColor: '#ff6b9d',
        radicalColor: '#ff6b9d',
        strokeWidth: 10,
        delayBetweenStrokes: 20,
        showCharacter: false
    });
    
    // 按顺序播放动画
    diWriter.animateCharacter().then(() => {
        return sanWriter.animateCharacter();
    }).then(() => {
        return zhanWriter.animateCharacter();
    }).then(() => {
        // 停止铅笔音效
        if (pencilAudio) {
            pencilAudio.pause();
            pencilAudio.currentTime = 0;
        }
        
        // 添加炫酷效果
        const containers = document.querySelectorAll('#di, #san, #zhan');
        containers.forEach(container => {
            container.classList.add('cool-effect');
        });
        
        // 动画完成后，保持显示一段时间
        setTimeout(() => {
            // 同时播放键盘音效和拨胡音乐
            if (audio1) {
                audio1.currentTime = 0;
                audio1.play().catch(e => console.error('Audio play failed:', e));
            }
            if (audio2) {
                audio2.currentTime = 0;
                audio2.play().catch(e => console.error('Audio play failed:', e));
            }
            
            // 1秒后跳转到万里江山场景
            setTimeout(() => {
                // 隐藏手写体容器和Canvas花瓣
                document.querySelector('.handwriting-wrapper').style.display = 'none';
                canvas.style.display = 'none';
                
                // 设置万里江山背景
                document.body.style.background = "url('../img/万里江山.gif') no-repeat center/cover";
                
                // 显示文字
                const txt = document.getElementById('txt');
                txt.style.display = 'block';
                
                let str = "想陪你走南闯北，看遍这山河浩瀚";
                let i = 0;
                let timer = setInterval(() => {
                    txt.innerHTML += str[i];
                    i++;
                    if (i == str.length) {
                        clearInterval(timer);
                        // 停止键盘音效，保留拨胡音乐
                        if (audio1) {
                            audio1.pause();
                            audio1.currentTime = 0;
                        }
                        
                        // 8秒后跳转到江南烟雨场景
                        setTimeout(() => {
                            document.body.style.background = "url('../img/江南烟雨.gif') no-repeat center/cover";
                            getOnBtn.style.display = 'block';
                            getOnBtn.onclick = function() {
                                window.location.href = "platform4.html";
                            };
                        }, 8000);
                    }
                }, 200);
            }, 1000);
        }, 500);
    });
}

// 4.5秒后开始第三站动画
setTimeout(() => {
    // 更改背景为#e1e9f2
    document.body.style.background = '#e1e9f2';
    
    // 显示手写体容器和Canvas花瓣
    document.querySelector('.handwriting-wrapper').style.display = 'block';
    canvas.style.display = 'block';
    // 开始渲染花瓣
    render();
    
    // 初始化第三站动画
    initThirdStationAnimation();
}, 4500);
