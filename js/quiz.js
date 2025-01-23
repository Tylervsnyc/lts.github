// Quiz state
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAge = '';
let studentName = '';

// Get age from URL parameter
function getSelectedAge() {
    const params = new URLSearchParams(window.location.search);
    return params.get('age');
}

// Load quiz data
async function loadQuizData() {
    try {
        const response = await fetch('./data/chapter2_quizzes.json');
        const data = await response.json();
        userAge = getSelectedAge();
        
        // Get student name (you might want to prompt for this at quiz start)
        studentName = prompt("Before we begin, what's your name?", "");
        
        if (userAge && data.age_groups[userAge]) {
            currentQuestions = data.age_groups[userAge].questions;
            showWelcomeMessage(data.age_groups[userAge].opening_message);
        } else {
            console.error('Age group not found');
        }
    } catch (error) {
        console.error('Error loading quiz:', error);
    }
}

function showWelcomeMessage(message) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div class="welcome-message">
            <p>${message}</p>
            <button class="choice-button" onclick="startQuiz()">Begin Quiz</button>
        </div>
    `;
}

function startQuiz() {
    showQuestion();
    updateProgress();
}

function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const quizContainer = document.getElementById('quiz-container');
    
    quizContainer.innerHTML = `
        <div class="question-container">
            <p class="question-text">${question.question}</p>
            <div class="choices-container">
                ${question.choices.map((choice, index) => `
                    <button class="choice-button" onclick="handleAnswer('${choice}')">${choice}</button>
                `).join('')}
            </div>
            <div id="feedback" class="feedback-container"></div>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${(currentQuestionIndex / currentQuestions.length) * 100}%"></div>
        </div>
        <div class="score-display">Score: ${score}/${currentQuestionIndex}</div>
    `;
}

function handleAnswer(selectedAnswer) {
    const question = currentQuestions[currentQuestionIndex];
    const feedback = document.getElementById('feedback');
    const isCorrect = selectedAnswer === question.correct_answer;
    
    // Disable all buttons
    document.querySelectorAll('.choice-button').forEach(btn => btn.disabled = true);
    
    // Show feedback
    feedback.textContent = isCorrect ? question.correct_response : question.incorrect_response;
    feedback.className = `feedback-container ${isCorrect ? 'correct' : 'incorrect'} visible`;
    
    if (isCorrect) score++;
    
    // Wait before moving to next question
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            showQuestion();
            updateProgress();
        } else {
            showReportCard();
        }
    }, 2000);
}

function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${(currentQuestionIndex / currentQuestions.length) * 100}%`;
    }
}

function showReportCard() {
    const percentage = (score / currentQuestions.length) * 100;
    const isPerfect = score === currentQuestions.length;
    
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div class="report-card">
            <h2>Quiz Complete!</h2>
            <div class="final-score">${percentage}%</div>
            <p>You got ${score} out of ${currentQuestions.length} questions correct!</p>
            ${isPerfect ? `
                <div class="perfect-score-message">
                    Purrfect Score! You've earned a certificate!
                </div>
                <button class="certificate-button" onclick="generateCertificate()">
                    Get Your Certificate
                </button>
            ` : ''}
            <button class="choice-button" onclick="window.location.href='index.html'">
                Return Home
            </button>
        </div>
    `;
}

function generateCertificate() {
    // Navigate to certificate page with parameters
    window.location.href = `certificate.html?name=${encodeURIComponent(studentName)}&age=${encodeURIComponent(userAge)}&chapter=2`;
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', loadQuizData); 