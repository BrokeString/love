class StarrySky {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.stars = [];
        this.mouse = { x: 0, y: 0 };
        this.isAnimating = true;
        this.starDensity = 200;
        this.animationSpeed = 3;
        
        this.init();
        this.bindEvents();
    }

    init() {
        this.resizeCanvas();
        this.createStars();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createStars() {
        this.stars = [];
        const count = Math.floor((this.starDensity * this.canvas.width * this.canvas.height) / 1000000);
        
        for (let i = 0; i < count; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.5 + 0.1,
                brightness: Math.random() * 0.8 + 0.2,
                twinkleSpeed: Math.random() * 0.05 + 0.01,
                twinkleOffset: Math.random() * Math.PI * 2,
                color: this.getRandomStarColor(),
                trail: []
            });
        }
    }

    getRandomStarColor() {
        const colors = [
            '#ffffff', // 白色
            '#b3e0ff', // 淡蓝色
            '#ffb3d9', // 淡粉色
            '#ffffb3', // 淡黄色
            '#d9b3ff'  // 淡紫色
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    drawBackground() {
        // 创建深空渐变背景
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, 
            this.canvas.height / 2, 
            0,
            this.canvas.width / 2, 
            this.canvas.height / 2, 
            Math.max(this.canvas.width, this.canvas.height) / 2
        );
        
        gradient.addColorStop(0, '#0a0a2a');
        gradient.addColorStop(0.5, '#0c0c34');
        gradient.addColorStop(1, '#000011');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 添加一些星云效果
        this.drawNebulae();
    }

    drawNebulae() {
        // 创建多个半透明的彩色圆形模拟星云
        const nebulae = [
            { x: this.canvas.width * 0.3, y: this.canvas.height * 0.2, radius: 150, color: 'rgba(138, 43, 226, 0.1)' },
            { x: this.canvas.width * 0.7, y: this.canvas.height * 0.3, radius: 120, color: 'rgba(75, 0, 130, 0.08)' },
            { x: this.canvas.width * 0.4, y: this.canvas.height * 0.7, radius: 180, color: 'rgba(106, 90, 205, 0.06)' },
            { x: this.canvas.width * 0.8, y: this.canvas.height * 0.6, radius: 100, color: 'rgba(123, 104, 238, 0.05)' }
        ];

        nebulae.forEach(nebula => {
            const gradient = this.ctx.createRadialGradient(
                nebula.x, nebula.y, 0,
                nebula.x, nebula.y, nebula.radius
            );
            gradient.addColorStop(0, nebula.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    updateStars() {
        const time = Date.now() * 0.001;
        
        this.stars.forEach(star => {
            // 星星闪烁效果
            const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
            
            // 星星移动（模拟荡漾效果）
            star.x += Math.sin(time * 0.5 + star.y * 0.001) * star.speed * this.animationSpeed * 0.1;
            star.y += Math.cos(time * 0.3 + star.x * 0.001) * star.speed * this.animationSpeed * 0.1;
            
            // 边界检查
            if (star.x < 0) star.x = this.canvas.width;
            if (star.x > this.canvas.width) star.x = 0;
            if (star.y < 0) star.y = this.canvas.height;
            if (star.y > this.canvas.height) star.y = 0;
            
            // 更新轨迹
            star.trail.push({ x: star.x, y: star.y });
            if (star.trail.length > 5) {
                star.trail.shift();
            }
            
            // 绘制轨迹
            this.drawStarTrail(star, twinkle);
            
            // 绘制星星
            this.drawStar(star, twinkle);
        });
    }

    drawStarTrail(star, twinkle) {
        if (star.trail.length < 2) return;
        
        this.ctx.beginPath();
        this.ctx.moveTo(star.trail[0].x, star.trail[0].y);
        
        for (let i = 1; i < star.trail.length; i++) {
            this.ctx.lineTo(star.trail[i].x, star.trail[i].y);
        }
        
        const alpha = 0.3 * twinkle * (star.trail.length / 5);
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        this.ctx.lineWidth = star.size * 0.5;
        this.ctx.stroke();
    }

    drawStar(star, twinkle) {
        // 绘制星星光晕
        const gradient = this.ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 3
        );
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 绘制星星核心
        this.ctx.fillStyle = star.color;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size * twinkle, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawMouseEffect() {
        if (this.mouse.x === 0 && this.mouse.y === 0) return;
        
        // 鼠标周围的涟漪效果
        const gradient = this.ctx.createRadialGradient(
            this.mouse.x, this.mouse.y, 0,
            this.mouse.x, this.mouse.y, 100
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, 100, 0, Math.PI * 2);
        this.ctx.fill();
    }

    animate() {
        if (!this.isAnimating) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawBackground();
        this.updateStars();
        this.drawMouseEffect();
        
        requestAnimationFrame(() => this.animate());
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createStars();
        });

        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = 0;
            this.mouse.y = 0;
        });
    }

    toggleAnimation() {
        this.isAnimating = !this.isAnimating;
        if (this.isAnimating) {
            this.animate();
        }
    }

    resetStars() {
        this.createStars();
    }

    setStarDensity(density) {
        this.starDensity = density;
        this.createStars();
    }

    setAnimationSpeed(speed) {
        this.animationSpeed = speed;
    }
}

// 初始化
const canvas = document.getElementById('starryCanvas');
const starrySky = new StarrySky(canvas);

// 绑定控制按钮
document.getElementById('toggleAnimation').addEventListener('click', () => {
    starrySky.toggleAnimation();
});

document.getElementById('resetStars').addEventListener('click', () => {
    starrySky.resetStars();
});

document.getElementById('starDensity').addEventListener('input', (e) => {
    starrySky.setStarDensity(parseInt(e.target.value));
});

document.getElementById('animationSpeed').addEventListener('input', (e) => {
    starrySky.setAnimationSpeed(parseInt(e.target.value));
});