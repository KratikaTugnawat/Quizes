// Initialize localStorage data
const users = JSON.parse(localStorage.getItem('users')) || {};
const quizzes = JSON.parse(localStorage.getItem('quizzes')) || {};
let currentUser = null;

// Show login form
function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('create-quiz-section').style.display = 'none';
    document.getElementById('available-quizzes-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('scores-section').style.display = 'none';
}

// Show signup form
function showSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('create-quiz-section').style.display = 'none';
    document.getElementById('available-quizzes-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('scores-section').style.display = 'none';
}

// Show create quiz form
function showCreateQuiz() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('create-quiz-section').style.display = 'block';
    document.getElementById('available-quizzes-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('scores-section').style.display = 'none';
}

// Show available quizzes
function showAvailableQuizzes() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('create-quiz-section').style.display = 'none';
    document.getElementById('available-quizzes-section').style.display = 'block';
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('scores-section').style.display = 'none';

    const quizzesList = document.getElementById('quizzes-list');
    quizzesList.innerHTML = '';
    Object.keys(quizzes).forEach((quizId) => {
        const li = document.createElement('li');
        li.textContent = quizzes[quizId].title;
        const button = document.createElement('button');
        button.textContent = 'Take Quiz';
        button.onclick = () => startQuiz(quizId);
        li.appendChild(button);
        quizzesList.appendChild(li);
    });
}

// Show quiz section
function showQuiz() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('create-quiz-section').style.display = 'none';
    document.getElementById('available-quizzes-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('scores-section').style.display = 'none';
}

// Show results section
function showResults(score) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('create-quiz-section').style.display = 'none';
    document.getElementById('available-quizzes-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'block';
    document.getElementById('scores-section').style.display = 'none';

    document.getElementById('score').textContent = `Your score: ${score}`;
}

// Show all scores section
function showScores() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('create-quiz-section').style.display = 'none';
    document.getElementById('available-quizzes-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('scores-section').style.display = 'block';

    const scoresList = document.getElementById('scores-list');
    scoresList.innerHTML = '';
    for (const [user, userData] of Object.entries(users)) {
        const li = document.createElement('li');
        li.textContent = `${user}: ${userData.score}`;
        scoresList.appendChild(li);
    }
}

// Add new quiz question
function addQuestion() {
    const questionText = document.getElementById('question-text').value;
    const option1 = document.getElementById('option1').value;
    const option2 = document.getElementById('option2').value;
    const option3 = document.getElementById('option3').value;
    const correctOption = parseInt(document.getElementById('correct-option').value);

    if (!questionText || !option1 || !option2 || !option3 || !correctOption) {
        alert('Please fill in all fields.');
        return;
    }

    const quizId = Date.now().toString(); // Unique ID for the quiz
    quizzes[quizId] = {
        title: questionText,
        questions: [
            {
                question: questionText,
                options: [option1, option2, option3],
                answer: correctOption
            }
        ]
    };

    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    showAvailableQuizzes();
}

// Start a quiz
function startQuiz(quizId) {
    const quiz = quizzes[quizId];
    document.getElementById('quiz-form').innerHTML = '';
    quiz.questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<p>${q.question}</p>`;
        q.options.forEach((option, i) => {
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = `question${index}`;
            optionInput.value = i + 1; // Store option index
            optionInput.id = `question${index}_option${i}`;
            const optionLabel = document.createElement('label');
            optionLabel.htmlFor = optionInput.id;
            optionLabel.textContent = option;
            questionDiv.appendChild(optionInput);
            questionDiv.appendChild(optionLabel);
        });
        document.getElementById('quiz-form').appendChild(questionDiv);
    });
    showQuiz();
}

// Submit quiz and calculate score
function submitQuiz() {
    const quizId = Object.keys(quizzes).find(id => quizzes[id].title === document.querySelector('#quiz-form > div > p').textContent);
    if (!quizId) return;

    const quiz = quizzes[quizId];
    let score = 0;

    quiz.questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === q.answer) {
            score++;
        }
    });

    // Update user score
    if (currentUser) {
        users[currentUser].score += score;
        localStorage.setItem('users', JSON.stringify(users));
    }

    showResults(score);
}

// Login user
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (users[username] && users[username].password === password) {
        currentUser = username;
        showCreateQuiz();
    } else {
        alert('Invalid username or password.');
    }
}

// Signup user
function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (users[username]) {
        alert('Username already exists.');
    } else {
        users[username] = { password, score: 0 };
        localStorage.setItem('users', JSON.stringify(users));
        showLogin();
    }
}

// Logout user (optional, not used in this script)
function logout() {
    currentUser = null;
    showLogin();
}

// Show create quiz form on page load if logged in
if (currentUser) {
    showCreateQuiz();
} else {
    showLogin();
}
