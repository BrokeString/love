// 页面加载后开始花朵生长动画
onload = () => {
    // 播放flower-open音乐
    const flowerOpenAudio = document.getElementById('flowerOpenAudio');
    if (flowerOpenAudio) {
        flowerOpenAudio.currentTime = 0;
        flowerOpenAudio.play().catch(e => console.error('Audio play failed:', e));
    }
    
    // 播放有点甜背景音乐
    const bgMusicAudio = document.getElementById('bgMusicAudio');
    if (bgMusicAudio) {
        bgMusicAudio.currentTime = 0;
        bgMusicAudio.play().catch(e => console.error('Background music play failed:', e));
    }
    
    const c = setTimeout(() => {
        document.body.classList.remove("not-loaded");
        clearTimeout(c);
    }, 1000);
    
    // 5秒后显示文字
    setTimeout(() => {
        showText();
    }, 5000);
};

// 显示文字
function showText() {
    const mainText = document.getElementById('mainText');
    mainText.style.display = 'block';
    
    // 3秒后文字消失，显示情书图片
    setTimeout(() => {
        hideText();
    }, 3000);
}

// 隐藏文字
function hideText() {
    const mainText = document.getElementById('mainText');
    mainText.style.animation = 'fadeOut 1s ease-in-out forwards';
    
    // 1秒后显示情书图片
    setTimeout(() => {
        showLoveletter();
    }, 1000);
}

// 显示情书图片
function showLoveletter() {
    const loveletterContainer = document.getElementById('loveletterContainer');
    loveletterContainer.style.display = 'block';
    
    // 4秒后（图片移动完成后）创建按钮
    setTimeout(() => {
        // 创建图片按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'image-button-container';
        
        // 创建按钮
        const viewButton = document.createElement('button');
        viewButton.textContent = '查收';
        
        // 按钮点击事件
        viewButton.onclick = function() {
            window.location.href = "../loveletter/loveletter.html";
        };
        
        // 将按钮添加到容器中
        buttonContainer.appendChild(viewButton);
        
        // 将容器添加到情书容器中
        loveletterContainer.appendChild(buttonContainer);
    }, 4000);
}
