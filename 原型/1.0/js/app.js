// 页面导航控制
function navigateTo(page) {
    window.location.href = page;
}

// 模拟页面间数据传递
function storeData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// 页面切换动画
function animatePageTransition(element, isEntering = true) {
    element.classList.add(isEntering ? 'page-transition-enter' : 'page-transition-exit');
    setTimeout(() => {
        element.classList.remove(isEntering ? 'page-transition-enter' : 'page-transition-exit');
    }, 300);
}

// 模拟震动反馈
function vibrate(duration = 10) {
    if ('vibrate' in navigator) {
        navigator.vibrate(duration);
    }
}

// 切换深色/浅色模式
function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    storeData('darkMode', isDark);
    return isDark;
}

// 检查用户首选的颜色模式
function checkColorScheme() {
    const savedMode = getData('darkMode');
    if (savedMode !== null) {
        document.body.classList.toggle('dark-mode', savedMode);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }
}

// 模拟消息通知
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'ios-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// 模拟长按事件
function setupLongPress(element, callback, duration = 500) {
    let timer;
    
    element.addEventListener('touchstart', (e) => {
        timer = setTimeout(() => {
            vibrate(20);
            callback(e);
        }, duration);
    });
    
    const cancelLongPress = () => {
        clearTimeout(timer);
    };
    
    element.addEventListener('touchend', cancelLongPress);
    element.addEventListener('touchmove', cancelLongPress);
}

// 底部导航栏切换
function setupTabBar() {
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有active类
            tabItems.forEach(tab => tab.classList.remove('active'));
            // 为当前点击项添加active类
            item.classList.add('active');
            
            // 获取目标页面并导航
            const targetPage = item.getAttribute('data-page');
            if (targetPage) {
                navigateTo(targetPage);
            }
        });
    });
}

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    checkColorScheme();
    setupTabBar();
    
    // 为页面内容添加初始动画
    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
        animatePageTransition(pageContent);
    }
}); 