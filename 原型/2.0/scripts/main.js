// main.js - 食物营养扫描助手 iOS App

// 页面导航
function navigateTo(page) {
  window.location.href = page;
}

// 返回上一页
function goBack() {
  window.history.back();
}

// 底部导航切换
function switchTab(tab) {
  const tabs = ['home', 'history', 'pk', 'profile'];
  const targetPage = `${tab}.html`;
  navigateTo(targetPage);
}

// 震动反馈 (模拟)
function vibrate() {
  if (navigator.vibrate) {
    navigator.vibrate(20);
  }
}

// 长按事件
function addLongPressEvent(element, callback, duration = 500) {
  let timer;
  let isLongPress = false;

  element.addEventListener('touchstart', (e) => {
    timer = setTimeout(() => {
      isLongPress = true;
      vibrate();
      callback(e);
    }, duration);
  });

  element.addEventListener('touchend', () => {
    clearTimeout(timer);
    isLongPress = false;
  });

  element.addEventListener('touchmove', () => {
    clearTimeout(timer);
    isLongPress = false;
  });

  // 鼠标支持
  element.addEventListener('mousedown', (e) => {
    timer = setTimeout(() => {
      isLongPress = true;
      callback(e);
    }, duration);
  });

  element.addEventListener('mouseup', () => {
    clearTimeout(timer);
    isLongPress = false;
  });

  element.addEventListener('mouseleave', () => {
    clearTimeout(timer);
    isLongPress = false;
  });
}

// 模拟相机拍照
function simulateCamera(targetElement, callback) {
  // 添加闪光效果
  const flash = document.createElement('div');
  flash.style.position = 'fixed';
  flash.style.top = '0';
  flash.style.left = '0';
  flash.style.right = '0';
  flash.style.bottom = '0';
  flash.style.backgroundColor = 'white';
  flash.style.opacity = '0';
  flash.style.zIndex = '1000';
  flash.style.transition = 'opacity 0.1s ease';
  document.body.appendChild(flash);

  // 闪光效果
  setTimeout(() => {
    flash.style.opacity = '1';
    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(flash);
        if (callback) callback();
      }, 100);
    }, 100);
  }, 100);
}

// 弹簧动画效果 (用于列表滚动等)
function applySpringAnimation(element) {
  element.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
}

// 页面淡入效果
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-in');
});

// 添加交互动效
function addInteractionEffects() {
  // 按钮点击效果
  const buttons = document.querySelectorAll('.button, .navbar-button, .tab-bar-item');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 100);
    });
  });

  // 列表项滑动交互
  const listItems = document.querySelectorAll('.list-item');
  listItems.forEach(item => {
    applySpringAnimation(item);
    let startX, moveX, isMoving = false;

    item.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isMoving = true;
    });

    item.addEventListener('touchmove', (e) => {
      if (!isMoving) return;
      moveX = e.touches[0].clientX - startX;
      if (Math.abs(moveX) < 100) {
        item.style.transform = `translateX(${moveX}px)`;
      }
    });

    item.addEventListener('touchend', () => {
      isMoving = false;
      item.style.transform = 'translateX(0)';
    });
  });
}

// 模拟数据
const mockData = {
  // 历史记录
  historyItems: [
    {
      id: 1,
      name: '坚果巧克力能量棒',
      brand: '自然能量',
      date: '2023-09-15',
      image: 'https://placehold.co/100x100/333/FFF',
      score: 'B',
      nutrition: {
        calories: 220,
        protein: 6,
        fat: 12,
        carbs: 24,
        sugar: 8,
        sodium: 15
      }
    },
    {
      id: 2,
      name: '原味酸奶',
      brand: '纯然牧场',
      date: '2023-09-14',
      image: 'https://placehold.co/100x100/333/FFF',
      score: 'A',
      nutrition: {
        calories: 120,
        protein: 8,
        fat: 4,
        carbs: 12,
        sugar: 10,
        sodium: 65
      }
    },
    {
      id: 3,
      name: '混合坚果',
      brand: '每日坚果',
      date: '2023-09-10',
      image: 'https://placehold.co/100x100/333/FFF',
      score: 'B',
      nutrition: {
        calories: 180,
        protein: 5,
        fat: 16,
        carbs: 8,
        sugar: 2,
        sodium: 120
      }
    }
  ],
  
  // 分享模板
  shareTemplates: [
    { id: 1, name: '简约营养', preview: 'https://placehold.co/200x300/333/FFF' },
    { id: 2, name: '健康对比', preview: 'https://placehold.co/200x300/333/FFF' },
    { id: 3, name: '每日记录', preview: 'https://placehold.co/200x300/333/FFF' },
    { id: 4, name: '营养分析', preview: 'https://placehold.co/200x300/333/FFF' }
  ],
  
  // 用户信息
  userProfile: {
    name: '李小健',
    gender: '男',
    age: 32,
    height: 175,
    weight: 68,
    activityLevel: '中度活动',
    dietPreferences: ['低糖', '高蛋白'],
    healthGoal: '保持健康'
  }
};

// 将模拟数据保存到 localStorage
function initMockData() {
  if (!localStorage.getItem('historyItems')) {
    localStorage.setItem('historyItems', JSON.stringify(mockData.historyItems));
  }
  
  if (!localStorage.getItem('userProfile')) {
    localStorage.setItem('userProfile', JSON.stringify(mockData.userProfile));
  }
  
  if (!localStorage.getItem('shareTemplates')) {
    localStorage.setItem('shareTemplates', JSON.stringify(mockData.shareTemplates));
  }
}

// 获取历史记录
function getHistoryItems() {
  const data = localStorage.getItem('historyItems');
  return data ? JSON.parse(data) : [];
}

// 获取用户资料
function getUserProfile() {
  const data = localStorage.getItem('userProfile');
  return data ? JSON.parse(data) : null;
}

// 获取单个食品详情
function getFoodDetail(id) {
  const items = getHistoryItems();
  return items.find(item => item.id === parseInt(id));
}

// 添加新的扫描记录
function addScanRecord(record) {
  const items = getHistoryItems();
  record.id = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  record.date = new Date().toISOString().split('T')[0];
  items.unshift(record);
  localStorage.setItem('historyItems', JSON.stringify(items));
  return record;
}

// 初始化页面
function initPage() {
  initMockData();
  addInteractionEffects();
  
  // 检查当前页面并执行特定初始化
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1);
  
  switch (page) {
    case 'home.html':
      initHomePage();
      break;
    case 'history.html':
      initHistoryPage();
      break;
    case 'profile.html':
      initProfilePage();
      break;
    case 'food-detail.html':
      initFoodDetailPage();
      break;
    case 'pk.html':
      initPkPage();
      break;
  }
}

// 当DOM加载完成时初始化页面
document.addEventListener('DOMContentLoaded', initPage); 