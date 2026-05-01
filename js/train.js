// 打字效果
function typeWriter(element, text, speed) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 主逻辑
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById("getOn");
    const audio = document.getElementById("audio");
    const audioLeave = document.getElementById("audioLeave");
    const txt = document.getElementById("txt");
    
    // 显示打字效果
    // setTimeout(() => {
    //     typeWriter(txt, "准备好了吗？我们的火车之旅即将开始...", 100);
    // }, 1000);
    
    // 8.5秒后显示按钮（火车停下后）
    setTimeout(function() {
        // 暂停音频
        audio.pause();
        
        // 更新文字
        txt.innerHTML = "火车已到站，请上车";
        
        // 显示按钮并添加动画
        btn.style.display = "block";
        gsap.from(btn, {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)"
        });
        
        // 点击按钮跳转到下一页
        btn.onclick = function() {
            // 隐藏按钮
            btn.style.display = "none";
            
            // 隐藏文字
            txt.style.display = "none";
            
            // 播放音效
            audioLeave.currentTime = 0;
            audioLeave.play();
            
            // 让火车继续往前开
            const train = document.querySelector('.train');
            train.classList.add('train-leave');
            
            // 3秒后跳转页面
            setTimeout(function() {
                window.location.href = "transition.html";
            }, 3000);
        };
    }, 8500);
});