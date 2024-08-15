function showSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}


function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
//const score = document.getElementById('scores-section').value;
    if (username && password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // if (users.some(user => user.username === username)) {
        //     alert('Username already exists!');
        //     return;
        // }
        let userExists = false;

        for (let i = 0; i < users.length; i++) {
            if (users[i].username === username) {
                userExists = true;
                break;  // Stop the loop once a match is found
            }
        }
        
        if (userExists) {
            alert('Username already exists!');
            return;
        }
         
        users.push({ username, password});
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Sign up successful!');
        showLogin();
    } else {
        alert('Please enter both username and password.');
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username && password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let user = null;
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === username && users[i].password === password) {
                user = users[i];
                break;  // Stop the loop once a match is found
            }
        }
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            showCreateQuiz();
        } else {
            alert('Invalid username or password.');
        }
    } else {
        alert('Please enter both username and password.');
    }
}

function showCreateQuiz() {
     document.getElementById('login-form').style.display = 'none';
     document.getElementById('signup-form').style.display = 'none';
    document.getElementById('create-quiz-section').style.display = 'block';
     document.getElementById('available-quizzes-section').style.display = 'none';
     document.getElementById('quiz-section').style.display = 'none';
     document.getElementById('results-section').style.display = 'none';
     document.getElementById('scores-section').style.display ='none';
}
function addQuestion() {
    const questionText = document.getElementById('question-text').value;
    const option1 = document.getElementById('option1').value;
    const option2 = document.getElementById('option2').value;
    const option3 = document.getElementById('option3').value;
    const correctOption = document.getElementById('correct-option').value;
    if (questionText && option1 && option2 && option3 && correctOption) {
        let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        quizzes.push({
            creator: currentUser.username,
            question: questionText,
            questions: [{
                question: questionText,
                options: [option1, option2, option3],
                answer: `Option ${correctOption}`
            }]
        });
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
        alert('Quiz added successfully!');
        document.getElementById('create-quiz-form').reset();
    } else {
        alert('Please fill in all fields.');
    }
}
function showAvailableQuizzes(){
    document.getElementById('create-quiz-section').style.display = 'none';
    document.getElementById('available-quizzes-section').style.display = 'block';
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'none';
    const quizzesList = document.getElementById('quizzes-list');
    quizzesList.innerHTML = '';
    // console.log(quizzesList);
   
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    quizzes.forEach((quiz, quizId) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${quiz.creator}: ${quiz.question}`;
        const takeQuizButton = document.createElement('button');
        takeQuizButton.textContent = 'Take Quiz';
        takeQuizButton.onclick = () => startQuiz(quizId);
        listItem.appendChild(takeQuizButton);
        quizzesList.appendChild(listItem);
    });

}
function startQuiz(quizId){
    document.getElementById('available-quizzes-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
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


function submitQuiz() {
   const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let score = 0;

    quizzes.forEach((quiz) => {
        quiz.questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption && parseInt(selectedOption.value, 10) === q.answer) {
                score++;
            }
        });
    });

    // Update user score
    if (currentUser) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
       
    }

    showResults(score)
  
}
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
   
// another submmit quiz
function submitQuizz(){
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
    if (!users[currentUser]) users[currentUser] = { password: '', score: 0 };
    users[currentUser].score += score;
    localStorage.setItem('users', JSON.stringify(users));
}

showResults(score);
}