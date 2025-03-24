// 用户认证相关的JavaScript代码

// 处理登录表单提交
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // 这里添加登录验证逻辑
    // 示例：检查用户名和密码是否符合要求
    if (username.length < 3 || password.length < 8) {
        alert('用户名或密码格式不正确');
        return false;
    }
    
    // TODO: 发送登录请求到服务器
    // 这里模拟登录成功
    localStorage.setItem('currentUser', username);
    updateUserStatus();
    
    // 登录成功后跳转到首页
    window.location.href = 'index.html';
    return false;
}

// 处理注册表单提交
function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const phone = document.getElementById('phone').value;
    
    // 验证用户输入
    if (password !== confirmPassword) {
        alert('两次输入的密码不一致');
        return false;
    }
    
    if (username.length < 3 || username.length > 20 || !/^[a-zA-Z0-9_]+$/.test(username)) {
        alert('用户名格式不正确');
        return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('邮箱格式不正确');
        return false;
    }
    
    if (!/^[0-9]{11}$/.test(phone)) {
        alert('手机号码格式不正确');
        return false;
    }
    
    // TODO: 发送注册请求到服务器
    // 这里模拟注册成功
    alert('注册成功！请登录');
    window.location.href = 'login.html';
    return false;
}

// 更新用户登录状态
function updateUserStatus() {
    const currentUser = localStorage.getItem('currentUser');
    const userStatusElement = document.getElementById('user-status');
    
    if (currentUser) {
        userStatusElement.innerHTML = `
            <span class="user-welcome">欢迎，${currentUser}</span>
            <button onclick="logout()" class="btn btn-secondary">退出登录</button>
        `;
    } else {
        userStatusElement.innerHTML = `
            <a href="login.html" class="btn btn-primary">登录</a>
            <a href="register.html" class="btn btn-secondary">注册</a>
        `;
    }
}

// 退出登录
function logout() {
    localStorage.removeItem('currentUser');
    updateUserStatus();
    window.location.href = 'index.html';
}

// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', function() {
    // 添加用户状态显示区域到导航栏
    const navList = document.querySelector('.nav-list');
    if (navList) {
        const userStatusLi = document.createElement('li');
        userStatusLi.id = 'user-status';
        userStatusLi.className = 'user-status';
        navList.appendChild(userStatusLi);
        
        // 更新用户状态显示
        updateUserStatus();
    }
});