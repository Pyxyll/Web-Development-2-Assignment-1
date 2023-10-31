// instantiating global variable tha are accessed in several functions
let username;
let score = 0;
let usernameSection = document.getElementById('userSection');
let usernameInput = document.getElementById('usernameInput');
let confirmUsername = document.getElementById('confirmUsername');
let usernameDisplay = document.getElementById('usernameDisplay');


// declaring array of objects containting a question and its answer.
const questions = [
    {
        question: "What is a popular front-end JavaScript library made by Meta/Facebook",
        answer: "react"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answer: "//"
    },
    {
        question: "What method can be used to write a message to the console?",
        answer: "console.log()"
    },
    {
        question: "Which company developed JavaScript?",
        answer: "netscape"
    },
    {
        question: "What is the primary file extension for JavaScript",
        answer: ".js"
    },
    {
        question: "How do you declare a JavaScript constant?",
        answer: "const"
    },
    {
        question: "Which event is fired when a button is clicked?",
        answer: "onclick"
    },
    {
        question: "How can you create a new array in JavaScript?",
        answer: "[]"
    },
    {
        question: "Which of these is not a JavaScript data type: Undefined, Number, Boolean, Float?",
        answer: "float"
    },
    {
        question: "How do you call a function named myFunction?",
        answer: "myfunction()"
    }
];


//getting & displaying username, hiding the field after submission.
confirmUsername.addEventListener('click', () => {
    username = usernameInput.value.toLowerCase();
    if (username.length < 6) {
        alert('Username should be at least 6 characters long. Try again.');
        return;
    }
    usernameDisplay.textContent = `Welcome to the JavaScript Quiz ${username}`;
    userSection.style.display = 'none'
    displayStart()
});

const displayStart = () => {
    const infoSection = document.getElementById('infoSection')
    infoSection.style.display = 'block'
}

const startQuiz = () => {
    let questionContainer = document.getElementById('questionContainer');
    let questionText = document.getElementById('questionText');
    let answerInput = document.getElementById('answerInput');
    let nextQuestionBtn = document.getElementById('nextQuestionBtn');

    infoSection.style.display = 'none'
    questionContainer.style.display = "block"
    usernameDisplay.textContent = `Good luck, ${username}`;

    let currentQuestionIndex = 0;
    shuffledQuestions = shuffleArray(questions);

    displayQuestion(shuffledQuestions[currentQuestionIndex]);

    nextQuestionBtn.addEventListener('click', () => {
        const userAnswer = answerInput.value.trim();
        const currentQuestion = shuffledQuestions[currentQuestionIndex];

        if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
            score++;
        }
        if (userAnswer === '') {
            alert('Try the question');
            return;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
            displayQuestion(shuffledQuestions[currentQuestionIndex]);
        } else {
            // Last question, change button text to "Finish Quiz"
            nextQuestionBtn.textContent = 'Finish Quiz';
        }

        // Check if all questions have been answered
        if (currentQuestionIndex === shuffledQuestions.length) {

            displayResults()
            console.log(`Quiz ended. Your score is ${score}/${shuffledQuestions.length}`);
            questionContainer.style.display = "none"
        }

        // Clear the input for the next question
        answerInput.value = '';
    });

    function displayQuestion(question) {
        questionText.textContent = question.question;
    }
};


const shuffleArray = (array) => {
    let shuffledArray = [...array]
    shuffledArray.sort(() => Math.random() - 0.5);
    console.log(shuffledArray)
    return shuffledArray;
}

const displayResults = () => {
    message = `Congratulations ${username}, You got ${score} out of ${shuffledQuestions.length} questions Correct.`;
    document.getElementById("resultMessage").textContent = message;

    let crownImage = document.getElementById("crown");
    if (score >= 5) {
        crownImage.src = "./images/gold.svg";
        crownImage.style.display = "block";
    } else if (score >= 3) {
        crownImage.src = "./images/silver.svg";
        crownImage.style.display = "block";
    } else if (score >= 1) {
        crownImage.src = "./images/bronze.svg";
        crownImage.style.display = "block";
    } else {
        message = `Sorry ${username}, You only got ${score} out of ${shuffledQuestions.length} questions Correct.`;
        document.getElementById("resultMessage").textContent = message;
        crownImage.style.display = "none";
    }
};
