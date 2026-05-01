// 粒子效果
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100) + 155}, 255, ${Math.random() * 0.5 + 0.5})`;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > this.canvas.width) this.reset();
        if (this.y < 0 || this.y > this.canvas.height) this.reset();
    }
    
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}

// 初始化粒子效果
function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(canvas));
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // 响应窗口大小变化
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// 回忆数据
const memories = [
    { day: 1, text: "故事开始于一次偶然的招呼" },
    { day: 2, text: "一起谈天说地，聊了很多话题，也是第一次知道你的遭遇" },
    { day: 10, text: "好久没联系了，既是对过去的远离，也是在向未来的你靠近" },
    { day: 20, text: "靠的更近了一些嘻嘻" },
    { day: 30, text: "比昨天又靠近了一些，开心" },
    { day: 40, text: "相遇加速中..." },
    { day: 50, text: "再给我快一点！" },
    {days: 60, text: "终于要见面了，小小欢呼一下，此时的你在想些什么呢？"},
    { day: 63, text: "命运的指针开始转动，第一次加上了微信，第一次有女孩子唱歌给我听，一起打电话到深夜，" },
    { day: 64, text: "第一次和你视频，怕让你失望，提前精心收拾了一下自己的头发" },
    { day: 65, text: "第一次和你见面，你比我想象的要勇敢，喜欢送你回家那个傍晚清爽的风" },
    { day: 66, text: "和我心爱的人换上了合拍情头(*^▽^*)！" },
    { day: 67, text: "带上了你送我的项链，感觉自己酷酷的" },
    { day: 68, text: "你说你做了一个梦，和我有关的，我很开心" },
    { day: 69, text: "呜呜，让我的宝宝受委屈了，今后想要更小心翼翼的对你" },
    { day: 70, text: "精心挑选礼物中..." },
    { day: 71, text: "决定好要后天见面了，这次我要更细心的准备一下" },
    { day: 72, text: "要见面了，同时这份准备了好久的礼物终于能让你亲手拆开了(#^.^#)" },
];

// 心动值相关变量
let heartProgress = 0;
const totalMemories = memories.length;
const progressPerMemory = 100 / totalMemories;

// 全局计时器变量
let timer = null;

// 全局计数变量
let count = 0;
let days = 0;
let counter = null;
let button = null;
let text2 = null;
let audio = null;

// 显示文字2的函数
function showTxt2(str) {
    let i = 0;
    let timer = setInterval(function() {
        text2.innerHTML += str[i];
        i++;
        if (i == str.length) {
            clearInterval(timer);
            audio.pause();
        }
    }, 250);
}

// 爱心绽放动画函数
function animateHeartBurst() {
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const progressBarCenterY = canvas.height / 2 - 10; // 进度条中心位置
    const heartCenterY = progressBarCenterY - 10; // 爱心中心位置，向上移动
    const heartRadius = 35; // 调整爱心半径
    const totalHearts = 8; // 周围生成的爱心数量
    const animationDuration = 1500; // 动画持续时间（毫秒）
    const startTime = Date.now();
    
    // 绘制单个爱心的函数
    function drawSingleHeart(x, y, size, opacity) {
        ctx.beginPath();
        ctx.moveTo(x, y - size * 0.5);
        ctx.bezierCurveTo(x + size * 0.5, y - size, x + size, y - size * 0.25, x + size, y + size * 0.25);
        ctx.bezierCurveTo(x + size, y + size, x, y + size * 1.5, x, y + size * 1.5);
        ctx.bezierCurveTo(x, y + size * 1.5, x - size, y + size, x - size, y + size * 0.25);
        ctx.bezierCurveTo(x - size, y - size * 0.25, x - size * 0.5, y - size, x, y - size * 0.5);
        ctx.closePath();
        // 使用与前面注入的爱心相同的颜色
        const gradient = ctx.createLinearGradient(x - size, y + size * 1.5, x - size, y - size);
        gradient.addColorStop(0, '#ff6b6b');
        gradient.addColorStop(1, '#ff8e53');
        ctx.fillStyle = gradient;
        ctx.globalAlpha = opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
    
    // 绘制完整进度条的函数
    function drawCompleteProgressBar() {
        const progressBarRadius = heartRadius * 3.2; // 调整进度条半径
        ctx.beginPath();
        ctx.arc(centerX, progressBarCenterY, progressBarRadius, 0, Math.PI * 2);
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#ff6b6b';
        ctx.stroke();
    }
    
    // 动画循环
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制中心爱心
        drawSingleHeart(centerX, heartCenterY, heartRadius, 1);
        
        // 绘制周围的爱心
        for (let i = 0; i < totalHearts; i++) {
            const angle = (i / totalHearts) * Math.PI * 2;
            const distance = heartRadius * 2 * progress; // 调整距离
            const x = centerX + Math.cos(angle) * distance;
            const y = heartCenterY + Math.sin(angle) * distance;
            const size = heartRadius * (0.7 + 0.2 * progress); // 调整大小
            const opacity = progress;
            drawSingleHeart(x, y, size, opacity);
        }
        
        // 绘制旋转进度条（最后绘制，确保在顶层）
        const progressBarRadius = heartRadius * 3.2; // 调整进度条半径
        const progressAngle = progress * Math.PI * 2;
        
        ctx.beginPath();
        ctx.arc(centerX, progressBarCenterY, progressBarRadius, -Math.PI / 2, -Math.PI / 2 + progressAngle);
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#ff6b6b';
        ctx.stroke();
        
        // 继续动画或完成
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // 确保绘制完整的进度条
            drawCompleteProgressBar();
            
            // 动画完成后跳转页面
            setTimeout(() => {
                window.location.href = "train.html";
            }, 500);
        }
    }
    
    // 开始动画
    animate();
}

// 开始计数函数
function startCounting() {
    // 清除之前的计时器，确保只有一个计时器在运行
    clearInterval(timer);
    
    // 检查是否已经达到目标天数
    if (count >= days) {
        console.log('Already reached target days, stopping counting...');
        return;
    }
    
    console.log('Starting counting from count:', count, 'target days:', days);
    
    // 计算每天应该增加的心动值
    const dailyHeartProgress = 100 / days;
    
    // 开始计数
    timer = setInterval(function() {
        count++;
        counter.textContent = "第" + count + "天";
        console.log('Count increased to:', count);
        
        // 增加心动值
        heartProgress += dailyHeartProgress;
        updateHeart();
        
        // 检查是否需要显示回忆
        const memory = memories.find(m => m.day === count);
        if (memory) {
            console.log('Found memory for day:', count);
            showMemory(memory.day, memory.text);
        }
        
        // 检查是否达到目标天数
        if (count >= days) {
            console.log('Reached target days, stopping counting...');
            clearInterval(timer);
            audio.play();
            showTxt2("这些日子一个愿望逐渐在我心中出现");
            text2.style.display = "block";
            
            // 确保爱心填满
            heartProgress = 100;
            updateHeart();
            
            setTimeout(function() {
                button.style.display = "block";
            }, 4000);
        }
    }, 200); // 计数速度（毫秒/天）
}

// 绘制爱心
function drawHeart(progress) {
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const heartSize = 40;
    
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制爱心轮廓
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - heartSize * 0.5);
    ctx.bezierCurveTo(centerX + heartSize, centerY - heartSize * 1.5, centerX + heartSize * 2, centerY - heartSize * 0.5, centerX + heartSize * 2, centerY + heartSize * 0.5);
    ctx.bezierCurveTo(centerX + heartSize * 2, centerY + heartSize * 1.5, centerX, centerY + heartSize * 2.5, centerX, centerY + heartSize * 2.5);
    ctx.bezierCurveTo(centerX, centerY + heartSize * 2.5, centerX - heartSize * 2, centerY + heartSize * 1.5, centerX - heartSize * 2, centerY + heartSize * 0.5);
    ctx.bezierCurveTo(centerX - heartSize * 2, centerY - heartSize * 0.5, centerX - heartSize, centerY - heartSize * 1.5, centerX, centerY - heartSize * 0.5);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fill();
    
    // 绘制填充部分
    if (progress > 0) {
        // 创建裁剪路径
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - heartSize * 0.5);
        ctx.bezierCurveTo(centerX + heartSize, centerY - heartSize * 1.5, centerX + heartSize * 2, centerY - heartSize * 0.5, centerX + heartSize * 2, centerY + heartSize * 0.5);
        ctx.bezierCurveTo(centerX + heartSize * 2, centerY + heartSize * 1.5, centerX, centerY + heartSize * 2.5, centerX, centerY + heartSize * 2.5);
        ctx.bezierCurveTo(centerX, centerY + heartSize * 2.5, centerX - heartSize * 2, centerY + heartSize * 1.5, centerX - heartSize * 2, centerY + heartSize * 0.5);
        ctx.bezierCurveTo(centerX - heartSize * 2, centerY - heartSize * 0.5, centerX - heartSize, centerY - heartSize * 1.5, centerX, centerY - heartSize * 0.5);
        ctx.closePath();
        ctx.clip();
        
        // 计算填充高度（从底部到顶部）
        const fillHeight = (progress / 100) * (heartSize * 3.5); // 增加高度计算，确保完全覆盖
        const fillY = centerY + heartSize * 2.5 - fillHeight;
        
        const gradient = ctx.createLinearGradient(0, centerY + heartSize * 2.5, 0, centerY - heartSize * 1.5);
        gradient.addColorStop(0, '#ff6b6b');
        gradient.addColorStop(1, '#ff8e53');
        ctx.fillStyle = gradient;
        ctx.fillRect(centerX - heartSize * 2.5, fillY, heartSize * 5, fillHeight);
        
        ctx.restore();
    }
}

// 更新爱心填充
function updateHeart() {
    const heartText = document.getElementById('heartText');
    
    // 确保进度不超过100%
    heartProgress = Math.min(heartProgress, 100);
    
    // 绘制爱心
    drawHeart(heartProgress);
    
    // 更新心动值文本
    heartText.textContent = `心动值: ${Math.round(heartProgress)}%`;
}

// 显示回忆卡片
function showMemory(day, text) {
    // 气泡出现时暂停计数
    clearInterval(timer);
    
    const memoriesContainer = document.getElementById('memories');
    const memoryCard = document.createElement('div');
    memoryCard.className = 'memory-card';
    memoryCard.innerHTML = `<p>第${day}天：${text}</p>`;
    
    // 生成360度随机位置
    const angle = Math.random() * Math.PI * 2; // 0-360度
    const distance = 150 + Math.random() * 100; // 随机距离
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    // 设置初始位置
    memoryCard.style.transform = `translate(${x}px, ${y}px) scale(0.8)`;
    
    memoryCard.style.opacity = '0';
    memoriesContainer.appendChild(memoryCard);
    
    // 强制重排
    void memoryCard.offsetWidth;
    
    // 应用动画
    memoryCard.style.transition = 'all 1.2s ease-out';
    memoryCard.style.transform = 'translateY(0) scale(1)';
    memoryCard.style.opacity = '1';
    
    // 播放气泡出现声音
    const bubbleAppearAudio = document.getElementById('bubbleAppear');
    if (bubbleAppearAudio) {
        try {
            bubbleAppearAudio.currentTime = 0;
            bubbleAppearAudio.play();
        } catch (e) {
            console.log('Audio play failed:', e);
        }
    }
    
    // 心动值已经在每天计数时自动增加，这里不再重复增加
    
    // 3秒后移除回忆卡片
    setTimeout(() => {
        // 播放气泡破裂声音
        const bubblePopAudio = document.getElementById('bubblePop');
        if (bubblePopAudio) {
            try {
                bubblePopAudio.currentTime = 0;
                bubblePopAudio.play();
            } catch (e) {
                console.log('Audio play failed:', e);
            }
        }
        
        // 应用消失动画
        memoryCard.style.transition = 'all 3s ease-out';
        memoryCard.style.transform = 'translateY(10px) scale(0.8)';
        memoryCard.style.opacity = '0';
        
        // 等待动画完成后移除卡片
        setTimeout(() => {
            memoryCard.remove();
            
            // 气泡消失后恢复计数
            startCounting();
        }, 3000);
    }, 3000);
}

// 初始化
window.addEventListener('load', function() {
    initParticles();
    
    counter = document.getElementById("counter");
    let text1 = document.getElementById("text1");
    text2 = document.getElementById("text2"); // 赋值给全局变量
    button = document.getElementById("button");
    audio = document.getElementById("audio"); // 赋值给全局变量
    
    // 获取当前时间
    var now = new Date();
    // 获取指定时间
    var target = new Date("2026/02/18");
    // 计算两个时间的差值（毫秒）
    var diff = now.getTime() - target.getTime();
    // 定义一天、一小时、一分钟和一秒的毫秒数
    var day = 1000 * 60 * 60 * 24;
    // 计算相应的天数、小时数、分钟数和秒数
    days = Math.floor(diff / day);
    
    // 初始化爱心
    drawHeart(0);
    
    function showTxt1(str) {
        let i = 0;
        let timer = setInterval(function() {
            text1.innerHTML += str[i];
            i++;
            if (i == str.length) {
                clearInterval(timer);
                audio.pause();
            }
        }, 300);
    }
    
    // 长按按钮触发爱心绽放
    let longPressTimer = null;
    const longPressDuration = 500; // 长按时间阈值（毫秒）
    
    // 点击按钮显示提示
    button.addEventListener('click', function() {
        alert("长按开启旅程");
    });
    
    button.addEventListener('mousedown', function() {
        longPressTimer = setTimeout(function() {
            // 执行长按操作
            animateHeartBurst();
        }, longPressDuration);
    });
    
    button.addEventListener('mouseup', function() {
        clearTimeout(longPressTimer);
    });
    
    button.addEventListener('mouseleave', function() {
        clearTimeout(longPressTimer);
    });
    
    // 触摸设备支持
    button.addEventListener('touchstart', function() {
        longPressTimer = setTimeout(function() {
            // 执行长按操作
            animateHeartBurst();
        }, longPressDuration);
    });
    
    button.addEventListener('touchend', function() {
        clearTimeout(longPressTimer);
    });
    
    setTimeout(() => showTxt1("今天是我们认识的"), 500);
    
    setTimeout(function() {
        counter.style.display = "block";
        
        // 开始计数
        startCounting();
    }, 3200);
});

// 添加记忆卡片淡出动画
const style = document.createElement('style');
style.textContent = `
    @keyframes memoryFadeOut {
        to {
            transform: translateY(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);