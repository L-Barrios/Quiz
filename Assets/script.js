// Question Array
var questions = [

    {
        Q: "Which of the following writes the message 'Hello World' alert box?",
        choices: [

            { choice: "alertBox('Hello World')", correct: false },
            { choice: "alert(Hello World)", correct: false },
            { choice: "msgAlert('Hello World')", correct: false },
            { choice: "alert('Hello World')", correct: true }
        ]
    },
    {
        Q: "What do you use to print data in the console?",
        choices: [

            { choice: "addEventListener.", correct: false },
            { choice: "console.log()", correct: true },
            { choice: "getElementById", correct: false },
            { choice: "Math.floor", correct: false }
        ]
    },
    {
        Q: "What word do you use to define a variable?",
        choices: [

            { choice: "var", correct: false },
            { choice: "let", correct: false },
            { choice: "const", correct: false },
            { choice: "All of the above.", correct: true }
        ]
    },
    {
        Q: "What is a prompt box?",
        choices: [

            { choice: "Box that allows the user to enter input by providing a text box", correct: true },
            { choice: "Box that allows the user to enter output by providing a text box", correct: false},
            
        ]
    }
]

// function to start timer

var countdown
function startCountdown() {
    timer = setInterval(function () { countTime() }, 1000);
}
function countTime() {

    if (timeLeft > 1 && currentQuestionIndex < questions.length) {

        timerSpan.textContent = timeLeft + ' seconds left.'
        timeLeft--;


    } else {

        timerSpan.textContent = '';
        clearInterval(timer)
        endQuiz();
    }
}





// function to start the quiz
function beginQuiz() {

    console.log("It works!");
    
    startButton.classList.add("hide");
    startText.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    

    questionContainerEl.classList.remove("hide");
    timerEl.classList.remove("hide");
    startTimer();

    displayNextQuestion();

}


// variable to select the initial screen's text
var startText = document.getElementById("start-text");

// variable to select the start button
var startButton = document.getElementById("start-btn");

// variable to select the next button
var nextButton = document.getElementById("next-btn");

// variable to select the question container div
var questionContainerEl = document.getElementById("question-container");

// variable to select the question div
var questionEl = document.getElementById("question")

// variable to select the choices div
var choiceEl = document.getElementById("choices")

// variable to select the choice buttons
var choiceButtonEl = document.getElementById("choice-btn")



// variable to keep track of time left
var timeLeft = 75;

// variable to select  timer
var timerSpan = document.getElementById("time-left")
var timerEl = document.getElementById("timer")



// variable to select scores form
var scoresForm = document.getElementById("scores-form")



// variable to select save button
var saveButton = document.getElementById("saveScoreBtn")

// variable to select play again button

var playAgain = document.getElementById("playAgain")

// function to start the quiz
function startQuiz() {

    console.log("It works!");
    // add code to hide start button & start text after pressing it
    startButton.classList.add("hide");
    startText.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    // add code to display question container element
    questionContainerEl.classList.remove("hide");
    timerEl.classList.remove("hide");
    startTimer();

    displayNextQuestion();

}

// function to display each question after the start button is pressed

function displayNextQuestion() {

    console.log(shuffledQuestions, currentQuestionIndex)

    displayQuestion(shuffledQuestions[currentQuestionIndex])
    questionChoices(questions.choices)

}

function displayQuestion(questions) {

    questionEl.innerText = questions.Q

}

// function to pick the correct answer in relation to the displayed question

function questionChoices() {
    // check if currentQuestionIndex > length of the questions (stop condition), if greater than, stop the timer/clock. 
    if (currentQuestionIndex > questions.length) {

        endQuiz();

    } else {

        document.getElementById("choices").innerText = ""

        // create for loop to go over choices

        for (let j = 0; j < 4; j++) {

            // create a button with event listener, append it to id of "choices"
            const choiceBtn = document.createElement("button")
            choiceBtn.classList.add("choice-btn")
            choiceBtn.setAttribute("id", j)
            // choiceBtn.setAttribute("id", questions[currentQuestionIndex].choices[j].choice)
            choiceBtn.innerText = questions[currentQuestionIndex].choices[j].choice
            choiceBtn.addEventListener("click", function () {


                var questionAnswer = (questions[currentQuestionIndex].choices[choiceBtn.id].correct)

                if (questionAnswer === true) {

                    let correctMsg = document.createElement("h2")
                    correctMsg.classList.add("correct")
                    correctMsg.innerText = "Correct!"
                    document.getElementById("choices").appendChild(correctMsg)
                    correctSound.play();


                } else {

                    let incorrectMsg = document.createElement("h2")
                    incorrectMsg.classList.add("incorrect")
                    incorrectMsg.innerText = "Incorrect! -10 seconds."
                    document.getElementById("choices").appendChild(incorrectMsg)
                    incorrectSound.play();
                    timeLeft -= 10

                }

                setTimeout(function () {

                    displayNextQuestion(currentQuestionIndex++);


                }, 1000)



            })
            document.getElementById("choices").appendChild(choiceBtn)
        }
    }
}






// function to end the quiz

let endGameText = document.createElement("h2")

function endQuiz() {

    // hide the quiz buttons once more
    questionContainerEl.classList.add("hide");
    timerEl.classList.add("hide");


    endGameText.classList.add("end-game")
    endGameText.innerText = "Time's up!"
    document.getElementById("endGame").appendChild(endGameText)


    displayScores();




}



// function to display user's score

let scores = document.createElement("h2")

function displayScores() {

    // when game ends display final score and have user input their intials to save score in local storage


    scores.classList.add("end-game")
    scores.innerText = "You got " + timeLeft + " points!"
    document.getElementById("endGame").appendChild(scores)

    scoresForm.classList.remove("hide");



}

// save score button logic

saveButton.addEventListener('click', function (event) {
    event.preventDefault();

    var highScoreInitals = document.querySelector("#userInitials").value;
    var highScore = timeLeft;


     localStorage.setItem("high-scores", JSON.stringify([highScore]))
     localStorage.setItem("user-initials", JSON.stringify([highScoreInitals])) 

    highScores();

    // high scores page

    function highScores() {

        scores.classList.add('hide')
        scoresForm.classList.add('hide')
        endGameText.classList.add("hide")
        playAgain.classList.remove("hide")

        const highScores = JSON.parse(localStorage.getItem("high-scores")) || []
        const highScoresIn = JSON.parse(localStorage.getItem("user-initials")) || []

        const score = {

            score: highScores,
            name: highScoresIn
        }


        highScores.push(score)
      





        let highScoresList = document.createElement("ul")
        highScoresList.classList.add("end-game")
        let highScoresListLi = document.createElement("li")
        highScoresListLi.classList.add("end-game")
        highScoresListLi.textContent = "Score: " + highScore + " Initials: " + highScoreInitals
        document.getElementById("endGame").appendChild(highScoresList)
        document.getElementById("endGame").appendChild(highScoresListLi)
    }

})


// eventListener to start the quiz when the button is pushed
startButton.addEventListener("click", startQuiz);


// display high scores
