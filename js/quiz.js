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
            <p class="fluffbutt-message">${message}</p>
            <div class="name-input">
                <input 
                    type="text" 
                    id="student-name" 
                    placeholder="Enter your first name"
                    onkeyup="checkNameInput()"
                    maxlength="20"
                >
            </div>
            <button class="choice-button" id="start-button" onclick="startQuiz()" disabled>
                Begin Quiz
            </button>
        </div>
    `;
}

function checkNameInput() {
    const nameInput = document.getElementById('student-name');
    const startButton = document.getElementById('start-button');
    studentName = nameInput.value.trim();
    startButton.disabled = !studentName;
}

function startQuiz() {
    studentName = document.getElementById('student-name').value.trim();
    if (!studentName) {
        alert('Please enter your first name before starting the quiz!');
        return;
    }
    showQuestion();
    updateProgress();
}

function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const quizContainer = document.getElementById('quiz-container');
    const progress = ((currentQuestionIndex) / 10) * 100;  // Always 10 questions
    
    quizContainer.innerHTML = `
        <div class="progress-tracker">
            <div class="tracker-steps">
                <div class="tracker-step ${currentQuestionIndex >= 0 ? 'completed' : ''} ${currentQuestionIndex === 0 ? 'active' : ''}">
                    <div class="step-number">1</div>
                    <div class="step-label">Start</div>
                </div>
                <div class="tracker-step ${currentQuestionIndex >= 3 ? 'completed' : ''} ${currentQuestionIndex === 3 ? 'active' : ''}">
                    <div class="step-number">4</div>
                    <div class="step-label">Getting There</div>
                </div>
                <div class="tracker-step ${currentQuestionIndex >= 6 ? 'completed' : ''} ${currentQuestionIndex === 6 ? 'active' : ''}">
                    <div class="step-number">7</div>
                    <div class="step-label">Almost Done</div>
                </div>
                <div class="tracker-step ${currentQuestionIndex >= 9 ? 'completed' : ''} ${currentQuestionIndex === 9 ? 'active' : ''}">
                    <div class="step-number">10</div>
                    <div class="step-label">Final Question</div>
                </div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
        </div>
        <div class="question-container">
            <p class="question-text">${question.question}</p>
            <div class="choices-container">
                ${question.choices.map((choice, index) => `
                    <button class="choice-button" onclick="handleAnswer('${choice}')">${choice}</button>
                `).join('')}
            </div>
            <div id="feedback" class="feedback-container"></div>
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