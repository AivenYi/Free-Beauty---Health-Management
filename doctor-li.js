// 李医生专家咨询页面交互脚本

// 显示聊天界面
function showChat() {
    document.getElementById('chatSection').style.display = 'block';
    // 滚动到聊天区域
    document.getElementById('chatSection').scrollIntoView({ behavior: 'smooth' });
}

// 发送消息
function sendMessage() {
    const userInput = document.getElementById('userMessage');
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    // 添加用户消息到聊天区域
    addMessage(message, 'user');
    
    // 清空输入框
    userInput.value = '';
    
    // 模拟医生回复
    setTimeout(() => {
        const response = generateResponse(message);
        addMessage(response, 'doctor');
        
        // 如果用户询问健康方案，则显示个性化健康方案
        if (message.includes('方案') || message.includes('计划') || message.includes('建议')) {
            generateHealthPlan();
        }
    }, 1000);
}

// 添加消息到聊天区域
function addMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const messageP = document.createElement('p');
    messageP.textContent = message;
    messageDiv.appendChild(messageP);
    
    chatMessages.appendChild(messageDiv);
    
    // 滚动到最新消息
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 生成医生回复
function generateResponse(message) {
    // 简单的关键词匹配回复
    if (message.includes('你好') || message.includes('您好')) {
        return '您好！很高兴为您提供健康咨询服务。请问您有什么健康问题需要咨询？';
    } else if (message.includes('皮肤') || message.includes('肌肤')) {
        return '皮肤问题可能与您的体质、生活习惯和环境因素有关。中医认为，皮肤是五脏六腑健康状况的外在表现。您能详细描述一下您的皮肤问题吗？';
    } else if (message.includes('失眠') || message.includes('睡眠')) {
        return '睡眠问题在中医看来多与心脾两脏有关。您的失眠是入睡困难还是易醒？是否伴有其他症状如心悸、多梦等？';
    } else if (message.includes('疲劳') || message.includes('乏力')) {
        return '疲劳乏力常见于气血不足或脾胃功能减弱。您的日常饮食规律吗？工作压力大吗？';
    } else if (message.includes('头痛') || message.includes('头晕')) {
        return '头痛头晕在中医看来可能与肝阳上亢、气血不足或痰湿阻滞有关。您的头痛是持续性的还是间歇性的？是否与情绪、天气变化有关？';
    } else if (message.includes('方案') || message.includes('计划') || message.includes('建议')) {
        return '根据您的描述，我可以为您制定一个个性化的健康调理方案。这个方案将包括饮食建议、作息调整、适合您的运动方式和中药食疗推荐。';
    } else {
        return '感谢您的咨询。为了给您提供更准确的健康建议，我需要了解更多关于您的情况。您能否详细描述一下您的症状、生活习惯和既往病史？';
    }
}

// 生成个性化健康方案
function generateHealthPlan() {
    // 显示健康方案区域
    document.getElementById('planSection').style.display = 'block';
    
    // 生成健康方案内容
    const planContent = document.getElementById('planContent');
    planContent.innerHTML = `
        <div class="plan-item">
            <h4>体质评估</h4>
            <p>根据您的描述，您可能属于<strong>气虚质</strong>偏向<strong>湿热质</strong>的体质类型。这种体质特点是容易疲劳、易出汗、皮肤容易出现湿疹或痘痘等问题。</p>
        </div>
        
        <div class="plan-item">
            <h4>饮食调理</h4>
            <p>建议您：</p>
            <ul>
                <li>多食用具有健脾益气功效的食物：山药、莲子、薏米、大枣等</li>
                <li>适当食用清热祛湿的食物：绿豆、冬瓜、苦瓜、赤小豆等</li>
                <li>减少辛辣、油腻、甜腻食物的摄入</li>
                <li>保持规律饮食，避免暴饮暴食</li>
            </ul>
        </div>
        
        <div class="plan-item">
            <h4>作息调整</h4>
            <p>建议您：</p>
            <ul>
                <li>保持规律作息，晚上11点前入睡</li>
                <li>午间可适当小憩15-30分钟，补充元气</li>
                <li>避免过度劳累和熬夜</li>
            </ul>
        </div>
        
        <div class="plan-item">
            <h4>运动建议</h4>
            <p>适合您的运动方式：</p>
            <ul>
                <li>温和的有氧运动：散步、太极、八段锦</li>
                <li>避免大强度、大负荷的运动</li>
                <li>坚持每天30-60分钟的适量运动</li>
            </ul>
        </div>
        
        <div class="plan-item">
            <h4>中药食疗</h4>
            <p>推荐食疗方：</p>
            <ul>
                <li><strong>健脾祛湿粥</strong>：薏米30g，赤小豆30g，山药20g，莲子15g，大枣5枚，煮粥食用</li>
                <li><strong>清热润燥茶</strong>：菊花10g，决明子10g，金银花10g，甘草5g，冲泡代茶饮</li>
            </ul>
        </div>
        
        <div class="plan-item">
            <h4>皮肤护理</h4>
            <p>建议您：</p>
            <ul>
                <li>保持面部清洁，使用温和不刺激的洁面产品</li>
                <li>避免使用含有酒精、香料等刺激性成分的护肤品</li>
                <li>保持充分的水分摄入，每天8杯水</li>
                <li>可尝试薏米面膜：薏米粉加蜂蜜调和敷面，具有清热祛湿效果</li>
            </ul>
        </div>
    `;
    
    // 滚动到健康方案区域
    document.getElementById('planSection').scrollIntoView({ behavior: 'smooth' });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            menuToggle.classList.toggle('active');
        });
    }
    
    // 初始化聊天输入框事件
    const userMessageInput = document.getElementById('userMessage');
    if (userMessageInput) {
        userMessageInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });
    }
});