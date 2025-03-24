// 体质测试问题数据
const tcmQuestions = [
    {
        id: 1,
        question: "您精力充沛吗？",
        options: [
            { value: 1, text: "很少" },
            { value: 2, text: "有时" },
            { value: 3, text: "经常" },
            { value: 4, text: "总是" }
        ]
    },
    {
        id: 2,
        question: "您容易疲劳吗？",
        options: [
            { value: 1, text: "很少" },
            { value: 2, text: "有时" },
            { value: 3, text: "经常" },
            { value: 4, text: "总是" }
        ]
    },
    {
        id: 3,
        question: "您容易气短，呼吸急促吗？",
        options: [
            { value: 1, text: "很少" },
            { value: 2, text: "有时" },
            { value: 3, text: "经常" },
            { value: 4, text: "总是" }
        ]
    },
    // ... 更多问题
];

// 当前问题索引
let currentQuestionIndex = 0;
// 用户答案
let userAnswers = [];

// DOM元素
const testIntro = document.getElementById('test-intro');
const testQuestions = document.getElementById('test-questions');
const testResult = document.getElementById('test-result');
const progressBar = document.getElementById('test-progress');
const currentQuestionElement = document.getElementById('current-question');

// 开始测试按钮点击事件
document.getElementById('start-test-btn').addEventListener('click', startTest);

// 重新测试按钮点击事件
document.getElementById('restart-test-btn').addEventListener('click', restartTest);

// 保存结果按钮点击事件
document.getElementById('save-result-btn').addEventListener('click', saveResult);

// 开始测试
function startTest() {
    testIntro.style.display = 'none';
    testQuestions.style.display = 'block';
    currentQuestionIndex = 0;
    userAnswers = [];
    showQuestion(currentQuestionIndex);
}

// 显示问题
function showQuestion(index) {
    const question = tcmQuestions[index];
    const progress = ((index + 1) / tcmQuestions.length) * 100;
    
    progressBar.style.width = `${progress}%`;
    currentQuestionElement.textContent = index + 1;
    
    const questionHtml = `
        <div class="question">
            <h4>${question.question}</h4>
            <div class="options">
                ${question.options.map(option => `
                    <button class="btn option-btn" onclick="selectOption(${option.value})">
                        ${option.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    testQuestions.innerHTML = questionHtml;
}

// 选择选项
function selectOption(value) {
    userAnswers.push(value);
    
    if (currentQuestionIndex < tcmQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        showResult();
    }
}

// 显示结果
function showResult() {
    testQuestions.style.display = 'none';
    testResult.style.display = 'block';
    
    // 计算体质类型
    const constitutionType = calculateConstitutionType(userAnswers);
    
    // 显示结果和建议
    const resultContent = document.getElementById('result-content');
    resultContent.innerHTML = `
        <div class="result-type">
            <h4>您的主要体质类型：${constitutionType.type}</h4>
            <p>${constitutionType.description}</p>
        </div>
        <div class="result-advice">
            <h4>养生建议：</h4>
            <ul>
                ${constitutionType.advice.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;
}

// 计算体质类型
function calculateConstitutionType(answers) {
    // 这里需要根据具体的计算规则来实现
    // 示例返回结果
    return {
        type: "气虚质",
        description: "气虚质的人容易疲劳，气短乏力，声音低弱，易出汗，舌淡苔白。",
        advice: [
            "起居有常，保证充足睡眠",
            "饮食宜温热，多食补气养血的食物",
            "适当运动，以轻柔缓和为主",
            "保持心情舒畅，避免过度劳累"
        ]
    };
}

// 重新测试
function restartTest() {
    testResult.style.display = 'none';
    startTest();
}

// 保存结果
function saveResult() {
    // 实现保存结果的逻辑
    alert('测试结果已保存！');
}