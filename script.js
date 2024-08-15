function showSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

// function signup(){
//     const username = document.getElementById('signup-username').value;
//     const password = document.getElementById('signup-password').value;
//     // console.log(username+""+password);
//     if(username&&password){
//         let users = JSON.parse(localStorage.getItem('users')) || [];
        
//         if (users.some(user => user.username === username)) {
//             alert('Username already exists!');
//             return;
//         }
//         localStorage.setItem(JSON.stringify(username),JSON.stringify(password));
//         alert("Signup Succesful");
//         login();
//     }
//     else{
//         alert('please enter both username and password');
//     }
// }
// function login(){
//     let username = document.getElementById('login-username').value;
//     let password = document.getElementById('login-password').value;
//     console.log(username+""+password);

//     if (username && password) {
//         let users = JSON.parse(localStorage.getItem('users')) || [];
//         const user = users.find(user => user.username === username && user.password === password);
        
//         if (user) {
//             localStorage.setItem('currentUser', JSON.stringify(user));
//             showCreateQuiz();
//         } else {
//             alert('Invalid username or password.');
//         }
//     } else {
//         alert('Please enter both username and password.');
//     }
// }
// function showCreateQuiz() {
//     document.getElementById('login-form').style.display = 'none';
//     document.getElementById('signup-form').style.display = 'none';
//     document.getElementById('create-quiz-section').style.display = 'block';
//     document.getElementById('available-quizzes-section').style.display = 'none';
//     document.getElementById('quiz-section').style.display = 'none';
//     document.getElementById('results-section').style.display = 'none';
// }
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
    quizzes.forEach((quiz, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${quiz.creator}: ${quiz.question}`;
        const takeQuizButton = document.createElement('button');
        takeQuizButton.textContent = 'Take Quiz';
        takeQuizButton.onclick = () => startQuiz(index);
        listItem.appendChild(takeQuizButton);
        quizzesList.appendChild(listItem);
    });

}
function startQuiz(index){
    document.getElementById('available-quizzes-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quiz = quizzes[index];
    const quizForm = document.getElementById('quiz-form');
   // Manually loop through each question and add it to the form
   for (let i = 0; i < quiz.questions.length; i++) {
    const q = quiz.questions[i];

    // Create a div element for each question
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `<strong>${q.question}</strong><br>`;

    // Manually loop through each option and add it to the questionDiv
    for (let j = 0; j < q.options.length; j++) {
        const option = q.options[j];

        const optionLabel = document.createElement('label');
        optionLabel.innerHTML = `
            <input type="radio" name="q${i}" value="${option}" required>
            ${option}
        `;
        
        // Add a line break after each option
        questionDiv.appendChild(optionLabel);
        questionDiv.appendChild(document.createElement('br'));
    }

    // Append the questionDiv to the form
    quizForm.appendChild(questionDiv);
    quizForm.appendChild(document.createElement('br')); // Add space between questions
   }

}

function submitQuiz() {

    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quiz = quizzes[0]; // Assuming there's only one quiz for simplicity
    
  var score = 0;
    // Loop through each question to calculate the score
    for (var i = 0; i < quiz.questions.length; i++) {
        
      const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
      if (selectedOption && selectedOption.value === quiz.questions[i].answer) {
        score++;
      }
    }
  
    console.log('Score:', score);
  
    // Hide the quiz section and show the results section
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'block';
  
    // Display the user's score for this quiz
    document.getElementById('score').innerText = `Your score: ${score}/${quiz.questions.length}`;
  
    // Update the user's total score in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('Current User:', currentUser);
  
    if (currentUser) {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      console.log('Users:', users);
  
      let foundUser = users.find(user => user.username === currentUser.username);
      if (foundUser) {
        foundUser.score = (foundUser.score || 0) + score; // Accumulate the score
        console.log('Updated user score:', foundUser.score);
      } else {
        console.error('User not found in users array');
      }
  
      localStorage.setItem('users', JSON.stringify(users));
      console.log('Updated users:', JSON.parse(localStorage.getItem('users')));
    }
  
    return score;
  }
function showScores() {
    const scoresList = document.getElementById('scores-list');
    scoresList.innerHTML = '';

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.username}: ${user.score}`;
        scoresList.appendChild(listItem);
    });

    document.getElementById('results-section').style.display = 'none';
    document.getElementById('scores-section').style.display = 'block';
    document.getElementById('create-quiz-section').style.display='none';
}

   