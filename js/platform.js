let text = document.getElementById("txt");
let btn = document.getElementById("getOn");
let audio = document.getElementById("audio");
let audio1 = document.getElementById("audio1");
let pencilAudio = document.getElementById("pencilAudio");
let particlesContainer = document.getElementById("particles");

// 创建樱花/雪花粒子
function createParticles() {
    const particleCount = 40;
    const colors = ['#ffb7c5', '#ffc0cb', '#ffd1dc', '#ffe4e1', '#fff0f5', '#ffffff'];
    
    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.className = 'particle';
        
        let size = Math.random() * 6 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
        particle.style.animationDelay = (Math.random() * 3) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particle.style.boxShadow = `0 0 ${size * 2}px ${particle.style.background}`;
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// 使用HanziWrite实现手写动画
function initHanziWrite() {
    // 播放pencil音频
    if (pencilAudio) {
        pencilAudio.play();
    }
    
    // 第一
    const firstWriter = HanziWriter.create('first', '第', {
        width: 200, // 扩大容器大小
        height: 200, // 扩大容器大小
        showOutline: false,
        strokeAnimationDuration: 160, // 加快动画速度，原来的1/5
        strokeColor: '#ff6b9d',
        radicalColor: '#ff6b9d',
        strokeWidth: 10, // 加粗笔画
        delayBetweenStrokes: 20, // 减少笔画间延迟，原来的1/5
        showCharacter: false // 初始不显示文字
    });
    
    // 一
    const yiWriter = HanziWriter.create('yi', '一', {
        width: 200, // 扩大容器大小
        height: 200, // 扩大容器大小
        showOutline: false,
        strokeAnimationDuration: 80, // 加快动画速度，原来的1/5
        strokeColor: '#ff6b9d',
        radicalColor: '#ff6b9d',
        strokeWidth: 10, // 加粗笔画
        delayBetweenStrokes: 20, // 减少笔画间延迟，原来的1/5
        showCharacter: false // 初始不显示文字
    });
    
    // 站
    const zhanWriter = HanziWriter.create('zhan', '站', {
        width: 200, // 扩大容器大小
        height: 200, // 扩大容器大小
        showOutline: false,
        strokeAnimationDuration: 240, // 加快动画速度，原来的1/5
        strokeColor: '#ff6b9d',
        radicalColor: '#ff6b9d',
        strokeWidth: 10, // 加粗笔画
        delayBetweenStrokes: 20, // 减少笔画间延迟，原来的1/5
        showCharacter: false // 初始不显示文字
    });
    
    // 按顺序播放动画
    firstWriter.animateCharacter().then(() => {
        return yiWriter.animateCharacter();
    }).then(() => {
        return zhanWriter.animateCharacter();
    }).then(() => {
        // 停止pencil音频
        if (pencilAudio) {
            pencilAudio.pause();
            pencilAudio.currentTime = 0;
        }
        
        // 添加炫酷效果
        const containers = document.querySelectorAll('#first, #yi, #zhan');
        containers.forEach(container => {
            container.classList.add('cool-effect');
        });
        
        // 动画完成后，保持显示一段时间
        setTimeout(() => {
            // 1秒后切换到流星雨背景
            setTimeout(function() {
                document.querySelector('.handwriting-wrapper').style.display = 'none';
                text.style.display = 'block';
                document.body.style.background = "url('../img/流星雨.gif') no-repeat center/cover";
                particlesContainer.innerHTML = '';
                
                // 在流星雨场景下播放keyboard音频和小星星音乐
                if (audio) {
                    audio.play();
                }
                if (audio1) {
                    audio1.play();
                }
                
                let str = "想和你看流星雨一颗颗划过天穹";
                let i = 0;
                let timer = setInterval(function() {
                    text.innerHTML += str[i];
                    i++;
                    if (i == str.length) {
                        clearInterval(timer);
                        // 停止keyboard音频
                        if (audio) {
                            audio.pause();
                            audio.currentTime = 0;
                        }
                        btn.style.display = "block";
                        btn.onclick = function() {
                            window.location.href = "platform2.html";
                        };
                    }
                }, 200);
            }, 1000);
        }, 500);
    });
}

// 初始化手写动画
initHanziWrite();
