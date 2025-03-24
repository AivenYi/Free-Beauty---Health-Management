// 自在美丽APP - 中国风网页交互脚本

// 四季养生标签切换
function showSeason(season) {
    // 移除所有标签的active类
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 给当前点击的标签添加active类
    document.querySelector(`.tab-btn[data-season="${season}"]`).classList.add('active');
    
    // 隐藏所有季节内容
    document.querySelectorAll('.season-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // 显示当前季节内容
    document.getElementById(`${season}-content`).classList.add('active');
}

// 中医体质测试
function startTcmTest() {
    window.location.href = 'tcm-test.html';
}

// 订阅功能
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    alert(`感谢订阅！我们将定期发送健康资讯到 ${email}`);
    event.target.reset();
    return false;
}

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const header = document.querySelector('.header');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            menuToggle.classList.toggle('active');
        });
    }
    
    // 滚动事件监听，增强导航栏视觉效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 创建默认图标
    function createDefaultIcon() {
        const defaultIcon = new Image();
        defaultIcon.src = 'images/default-icon.png';
        document.body.appendChild(defaultIcon);
        defaultIcon.style.display = 'none';
    }
    
    createDefaultIcon();
    
    // 图片加载失败处理
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            if (this.getAttribute('onerror')) {
                // 已经有onerror属性的图片会自动处理
                return;
            }
            
            // 对于没有onerror属性的图片，设置默认图片
            this.src = 'images/placeholder.jpg';
        });
    });
    
    // 轮播图控制
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const storyCards = document.querySelectorAll('.story-card');
    
    if (carouselPrev && carouselNext && storyCards.length > 0) {
        let currentIndex = 0;
        
        // 隐藏所有卡片，只显示当前卡片
        function updateCarousel() {
            storyCards.forEach((card, index) => {
                if (index === currentIndex) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        // 初始化轮播
        updateCarousel();
        
        // 上一个故事
        carouselPrev.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + storyCards.length) % storyCards.length;
            updateCarousel();
        });
        
        // 下一个故事
        carouselNext.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % storyCards.length;
            updateCarousel();
        });
    }
    
    // 添加淡入动画效果
    const fadeElements = document.querySelectorAll('.section-title, .feature-card, .quote-card, .story-card');
    
    if (fadeElements.length > 0) {
        fadeElements.forEach(element => {
            element.classList.add('fade-in');
        });
    }
    
    // 每日鼓励语分享功能
    const shareButton = document.querySelector('.quote-card .btn');
    
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            const quoteText = document.querySelector('.quote-card blockquote p').textContent;
            
            // 检查是否支持网页分享API
            if (navigator.share) {
                navigator.share({
                    title: '今日雅言 - 自在美丽',
                    text: quoteText,
                    url: window.location.href
                })
                .catch(error => {
                    console.log('分享失败:', error);
                    alert('分享功能暂时不可用，请稍后再试。');
                });
            } else {
                // 不支持分享API时，复制到剪贴板
                const textarea = document.createElement('textarea');
                textarea.value = quoteText;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                alert('雅言已复制到剪贴板！');
            }
        });
    }
    
    // 锻炼页面折叠面板
    const exerciseHeaders = document.querySelectorAll('.exercise-header');
    
    if (exerciseHeaders.length > 0) {
        exerciseHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const icon = this.querySelector('.toggle-icon');
                
                // 切换内容显示/隐藏
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                    icon.textContent = '+';
                } else {
                    content.style.display = 'block';
                    icon.textContent = '-';
                }
            });
        });
    }
    
    // 食谱详情模态框
    const recipeButtons = document.querySelectorAll('.recipe-btn');
    const recipeModal = document.getElementById('recipe-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');
    
    if (recipeButtons.length > 0 && recipeModal) {
        // 打开模态框
        recipeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const recipeId = this.getAttribute('data-recipe');
                // 根据食谱ID加载对应内容
                loadRecipeContent(recipeId);
                recipeModal.style.display = 'block';
            });
        });
        
        // 关闭模态框
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                recipeModal.style.display = 'none';
            });
        }
        
        // 点击模态框外部关闭
        window.addEventListener('click', function(event) {
            if (event.target === recipeModal) {
                recipeModal.style.display = 'none';
            }
        });
        
        // 加载食谱内容
        function loadRecipeContent(recipeId) {
            // 这里可以通过AJAX从服务器获取内容，或者使用预定义的内容
            const recipeContents = {
                'recipe1': `
                    <h3>五谷杂粮粥</h3>
                    <div class="recipe-detail-image">
                        <img src="images/recipe1.jpg" alt="五谷杂粮粥">
                    </div>
                    <div class="recipe-ingredients">
                        <h4>食材</h4>
                        <ul>
                            <li>糙米 30克</li>
                            <li>小米 20克</li>
                            <li>燕麦 20克</li>
                            <li>红豆 20克</li>
                            <li>薏仁 20克</li>
                            <li>枸杞 10克</li>
                            <li>红枣 5颗</li>
                            <li>清水 适量</li>
                        </ul>
                    </div>
                    <div class="recipe-steps">
                        <h4>做法步骤</h4>
                        <ol>
                            <li>将所有食材洗净，红豆和薏仁提前浸泡2小时。</li>
                            <li>将所有食材放入锅中，加入适量清水。</li>
                            <li>大火煮沸后转小火慢炖40-50分钟，直至食材熟烂。</li>
                            <li>根据个人口味可加入少量蜂蜜或红糖调味。</li>
                        </ol>
                    </div>
                    <div class="recipe-benefits">
                        <h4>营养价值</h4>
                        <p>五谷杂粮粥富含膳食纤维、B族维生素和多种矿物质，有助于肠道健康，稳定血糖，增强免疫力。适合早餐食用，也可作为夜宵，帮助改善睡眠。</p>
                    </div>
                `,
                'recipe2': `
                    <h3>清蒸鱼</h3>
                    <div class="recipe-detail-image">
                        <img src="images/recipe2.jpg" alt="清蒸鱼">
                    </div>
                    <div class="recipe-ingredients">
                        <h4>食材</h4>
                        <ul>
                            <li>新鲜鱼 1条（约500克）</li>
                            <li>姜 20克</li>
                            <li>葱 2根</li>
                            <li>蒸鱼豉油 2汤匙</li>
                            <li>食用油 1汤匙</li>
                            <li>盐 适量</li>
                            <li>料酒 1汤匙</li>
                            <li>香菜 少许</li>
                        </ul>
                    </div>
                    <div class="recipe-steps">
                        <h4>做法步骤</h4>
                        <ol>
                            <li>鱼洗净，在两侧各划三刀，抹上少许盐和料酒腌制10分钟。</li>
                            <li>姜切丝，葱切段，一半铺在盘底，一半备用。</li>
                            <li>将鱼放在姜葱上，上锅蒸8-10分钟。</li>
                            <li>取出后倒掉盘中水分，撒上剩余姜葱和香菜。</li>
                            <li>锅中热油至冒烟，浇在鱼上，最后淋上蒸鱼豉油即可。</li>
                        </ol>
                    </div>
                    <div class="recipe-benefits">
                        <h4>营养价值</h4>
                        <p>鱼肉富含优质蛋白和不饱和脂肪酸，特别是DHA和EPA，有益于心脑血管健康和大脑发育。清蒸的烹饪方式保留了食材的原汁原味和营养成分，是健康饮食的理想选择。</p>
                    </div>
                `,
                'recipe3': `
                    <h3>药膳炖鸡</h3>
                    <div class="recipe-detail-image">
                        <img src="images/recipe3.jpg" alt="药膳炖鸡">
                    </div>
                    <div class="recipe-ingredients">
                        <h4>食材</h4>
                        <ul>
                            <li>乌鸡 半只</li>
                            <li>黄芪 15克</li>
                            <li>党参 10克</li>
                            <li>枸杞 15克</li>
                            <li>红枣 5颗</li>
                            <li>姜 3片</li>
                            <li>盐 适量</li>
                            <li>料酒 1汤匙</li>
                        </ul>
                    </div>
                    <div class="recipe-steps">
                        <h4>做法步骤</h4>
                        <ol>
                            <li>乌鸡洗净切块，焯水去血水和杂质。</li>
                            <li>黄芪、党参用纱布包好，红枣去核。</li>
                            <li>将所有材料放入炖盅，加入适量清水。</li>
                            <li>隔水炖煮1.5-2小时，直至鸡肉酥烂。</li>
                            <li>加入适量盐调味即可食用。</li>
                        </ol>
                    </div>
                    <div class="recipe-benefits">
                        <h4>营养价值</h4>
                        <p>此药膳炖鸡结合了中医药膳理念，黄芪、党参有补气养血之效，配合乌鸡的滋补特性，适合气血不足、体虚乏力者食用。秋冬季节食用尤佳，可增强免疫力，抵御寒冷。</p>
                    </div>
                `,
                'recipe4': `
                    <h3>四季养生汤</h3>
                    <div class="recipe-detail-image">
                        <img src="images/recipe4.jpg" alt="四季养生汤">
                    </div>
                    <div class="recipe-ingredients">
                        <h4>食材</h4>
                        <ul>
                            <li>当季蔬菜 200克</li>
                            <li>菌菇类 100克</li>
                            <li>豆腐 100克</li>
                            <li>枸杞 10克</li>
                            <li>红枣 3颗</li>
                            <li>姜 5片</li>
                            <li>盐 适量</li>
                            <li>香菜 少许</li>
                        </ul>
                    </div>
                    <div class="recipe-steps">
                        <h4>做法步骤</h4>
                        <ol>
                            <li>当季蔬菜洗净切块，菌菇类洗净备用。</li>
                            <li>锅中加水煮沸，放入姜片和红枣。</li>
                            <li>加入菌菇类和较硬的蔬菜，煮5分钟。</li>
                            <li>加入豆腐和其余蔬菜，煮3分钟。</li>
                            <li>最后加入枸杞，盐调味，撒上香菜即可。</li>
                        </ol>
                    </div>
                    <div class="recipe-benefits">
                        <h4>营养价值</h4>
                        <p>四季养生汤根据季节变化选用不同食材，春季可选用春笋、荠菜；夏季可用冬瓜、丝瓜；秋季可用山药、莲藕；冬季可用白萝卜、白菜。顺应节气养生，增强免疫力。</p>
                    </div>
                `
            };
            
            if (modalBody && recipeContents[recipeId]) {
                modalBody.innerHTML = recipeContents[recipeId];
            }
        }
    }
    
    // 心理工具按钮
    const toolButtons = document.querySelectorAll('.tool-btn');
    
    if (toolButtons.length > 0) {
        toolButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const toolId = this.getAttribute('data-tool');
                alert(`即将开始${toolId === 'meditation' ? '冥想练习' : toolId === 'gratitude' ? '感恩日记' : '积极自我对话'}，此功能正在开发中...`);
            });
        });
    }
    
    // 个人档案表单提交
    const profileForm = document.querySelector('.profile-form');
    
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 收集表单数据
            const formData = {
                name: document.getElementById('name').value,
                gender: document.getElementById('gender').value,
                age: document.getElementById('age').value,
                height: document.getElementById('height').value,
                weight: document.getElementById('weight').value,
                bodyType: document.getElementById('body-type').value,
                // 其他表单字段...
            };
            
            // 这里可以添加表单验证逻辑
            if (!formData.name) {
                alert('请输入您的姓名');
                return;
            }
            
            // 模拟表单提交
            alert('个人档案保存成功！我们将根据您的信息为您提供个性化的健康建议。');
            
            // 实际应用中，这里应该发送数据到服务器
            console.log('提交的表单数据:', formData);
        });
    }
    
    // 滑块值显示
    const stressSlider = document.getElementById('stress-level');
    const stressValue = document.querySelector('.stress-value');
    
    if (stressSlider) {
        stressSlider.addEventListener('input', function() {
            // 显示当前值
            const value = this.value;
            if (stressValue) {
                stressValue.textContent = value;
            }
            console.log('当前压力值:', value);
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 社区活动报名
    const eventButtons = document.querySelectorAll('.event-card .btn');
    
    if (eventButtons.length > 0) {
        eventButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const eventName = this.closest('.event-card').querySelector('h3').textContent;
                alert(`您已成功报名参加"${eventName}"活动，我们将通过短信通知您活动详情。`);
            });
        });
    }
    
    // 进度追踪标签切换
    const tabButtons = document.querySelectorAll('.tracking-tabs .tab-btn');
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 移除所有标签的active类
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // 给当前点击的标签添加active类
                this.classList.add('active');
                
                // 隐藏所有内容
                const contents = document.querySelectorAll('.tracking-content');
                contents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // 显示当前内容
                const tabId = this.getAttribute('data-tab');
                document.getElementById(`${tabId}-content`).classList.add('active');
            });
        });
    }
    
    // 侧边栏导航滚动
    const navLinks = document.querySelectorAll('.profile-nav a');
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 移除所有导航项的active类
                navLinks.forEach(navLink => {
                    navLink.parentElement.classList.remove('active');
                });
                
                // 给当前点击的导航项添加active类
                this.parentElement.classList.add('active');
                
                // 滚动到目标区域
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // 初始化樱花动画
    const sakuraAnimation = new SakuraAnimation();
});

// 樱花动画类
class SakuraAnimation {
    constructor() {
        this.container = document.getElementById('sakura-container');
        this.maxPetals = 30;
        this.petals = [];
        this.initialize();
    }

    initialize() {
        if (!this.container) {
            console.warn('找不到樱花容器元素');
            return;
        }
        for (let i = 0; i < this.maxPetals; i++) {
            this.createPetal();
        }
        this.animate();
    }

    createPetal() {
        const petal = document.createElement('div');
        petal.className = 'sakura';
        const size = Math.random() * 10 + 5;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * window.innerWidth}px`;
        petal.style.top = `-${size}px`;
        petal.style.animationDuration = `${Math.random() * 3 + 2}s`;
        this.container.appendChild(petal);
        return petal;
    }

    animate() {
        const petals = this.container.children;
        for (let petal of petals) {
            const rect = petal.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
                petal.remove();
                this.createPetal();
            }
        }
        requestAnimationFrame(() => this.animate());
    }
}

// 添加樱花飘落动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(-10px) rotate(0deg);
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
        }
    }

    .sakura {
        position: absolute;
        background: #ffd7e6;
        border-radius: 50%;
        animation: fall linear infinite;
        opacity: 0.6;
    }

    #sakura-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
    }
`;
document.head.appendChild(style);

// 删除重复的计时器代码，只保留一份完整的实现
let timerInterval;
let timeLeft = 0;
let isRunning = false;
let isCountUp = false;

function updateTimerDisplay() {
    const minutes = Math.floor(Math.abs(timeLeft) / 60);
    const seconds = Math.abs(timeLeft) % 60;
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (minutesElement && secondsElement) {
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        const timerLabel = document.querySelector('.timer-label');
        if (timerLabel) {
            if (isRunning) {
                timerLabel.textContent = isCountUp ? '正计时中...' : '倒计时中...';
            } else if (timeLeft === 0) {
                timerLabel.textContent = '准备开始';
            } else {
                timerLabel.textContent = '已暂停';
            }
        }
    }
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        if (timeLeft === 0) {
            isCountUp = true;
        }
        timerInterval = setInterval(() => {
            if (isCountUp) {
                timeLeft++;
            } else {
                if (timeLeft > 0) {
                    timeLeft--;
                    if (timeLeft === 0) {
                        clearInterval(timerInterval);
                        isRunning = false;
                        playTimerEndSound();
                        showNotification('计时结束！');
                    }
                }
            }
            updateTimerDisplay();
        }, 1000);
        updateTimerDisplay();
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        updateTimerDisplay();
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isCountUp = false;
    timeLeft = 0;
    updateTimerDisplay();
}

function setTimer(minutes) {
    clearInterval(timerInterval);
    isRunning = false;
    isCountUp = false;
    timeLeft = minutes * 60;
    updateTimerDisplay();
}

// 添加提示音效果
function playTimerEndSound() {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10...');
    audio.play();
}

// 添加通知提示
function showNotification(message) {
    if (!("Notification" in window)) {
        alert(message);
        return;
    }

    if (Notification.permission === "granted") {
        new Notification("计时器", { body: message });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                new Notification("计时器", { body: message });
            }
        });
    }
}