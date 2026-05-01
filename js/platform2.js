// 粒子效果
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机大小
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // 随机位置
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // 随机颜色
        const colors = ['#ff6b9d', '#ff8fab', '#f9c5d1', '#fdeff2'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // 随机动画延迟和持续时间
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// 初始化粒子效果
createParticles();

// 手写动画
const pencilAudio = document.getElementById('pencilAudio');
const audio = document.getElementById('audio');
const audio2 = document.getElementById('audio2');
const getOnBtn = document.getElementById('getOn');

// 预加载音频文件
function preloadAudio() {
    // 为每个音频元素创建一个新的Audio对象来预加载
    const audioFiles = [
        '../music/keyboard.mp3',
        '../music/浮光.mp3',
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

// 第二站文字动画
function initSecondStationAnimation() {
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
    
    // 初始化"二"字
    const erWriter = HanziWriter.create('er', '二', {
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
    const zhanWriter = HanziWriter.create('zhan2', '站', {
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
        return erWriter.animateCharacter();
    }).then(() => {
        return zhanWriter.animateCharacter();
    }).then(() => {
        // 停止铅笔音效
        if (pencilAudio) {
            pencilAudio.pause();
            pencilAudio.currentTime = 0;
        }
        
        // 添加炫酷效果
        const containers = document.querySelectorAll('#di, #er, #zhan2');
        containers.forEach(container => {
            container.classList.add('cool-effect');
        });
        
        // 动画完成后，保持显示一段时间
        setTimeout(() => {
            // 1秒后跳转到孔明灯场景
            setTimeout(() => {
                // 隐藏手写体容器
                document.querySelector('.handwriting-wrapper').style.display = 'none';
                
                // 设置孔明灯背景
                document.body.style.background = "url('../img/孔明灯.gif') no-repeat center/cover";
                
                // 显示文字
                const txt = document.getElementById('txt');
                txt.style.display = 'block';
                
                // 确保音频元素已加载并同时播放键盘音效和浮光音乐
                if (audio) {
                    audio.currentTime = 0;
                    audio.play().catch(e => console.error('Audio play failed:', e));
                }
                if (audio2) {
                    audio2.currentTime = 0;
                    audio2.play().catch(e => console.error('Audio play failed:', e));
                }
                
                let str = "想与你共赏明灯三千，烟火满城";
                let i = 0;
                let timer = setInterval(() => {
                    txt.innerHTML += str[i];
                    i++;
                    if (i == str.length) {
                        clearInterval(timer);
                        // 停止键盘音效，保留浮光音乐
                        if (audio) {
                            audio.pause();
                            audio.currentTime = 0;
                        }
                        
                        // 5秒后捕获孔明灯GIF的最后一帧并显示为静态图片
                        setTimeout(() => {
                            // 创建Canvas元素来捕获GIF的最后一帧
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');
                            const img = new Image();
                            img.src = '../img/孔明灯.gif';
                            img.onload = function() {
                                // 设置Canvas大小与图片一致
                                canvas.width = img.width;
                                canvas.height = img.height;
                                
                                // 绘制图片到Canvas
                                ctx.drawImage(img, 0, 0);
                                
                                // 将Canvas转换为DataURL
                                const dataURL = canvas.toDataURL('image/png');
                                
                                // 用静态图片替换GIF
                                document.body.style.background = `url('${dataURL}') no-repeat center/cover`;
                            };
                            
                            // 10秒后显示按钮
                            setTimeout(() => {
                                getOnBtn.style.display = 'block';
                                getOnBtn.onclick = function() {
                                    window.location.href = "platform3.html";
                                };
                            }, 5000);
                        }, 5000);
                    }
                }, 200);
            }, 1000);
        }, 500);
    });
}

// 4秒后开始第二站动画
setTimeout(() => {
    // 更改背景为黑色
    document.body.style.background = 'black';
    
    // 显示手写体容器
    document.querySelector('.handwriting-wrapper').style.display = 'block';
    
    // 初始化第二站动画
    initSecondStationAnimation();
}, 4000);
