const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Qual é a capital da França??",
    choice1: "Paris",
    choice2: "Roma",
    choice3: "Los Angeles",
    choice4: "London",
    answer: 1
  },
  {
    question:
      "'Que criou o computador'?",
    choice1: "Steve Jobs",
    choice2: "Alan Turing",
    choice3: "Charles Babbage",
    choice4: "Blaise Pascal",
    answer: 3
  },
  {
    question: "Quem criou a Primeira Linguagem de programação??",
    choice1: "Bill Gates",
    choice2: "Herman Hollerith",
    choice3: "John Shepard",
    choice4: "Ada Lovelace",
    answer: 4
  },
  {
    question: "Pergunta genérica 4",
    choice1: "Resposta",
    choice2: "Herman Hollerith",
    choice3: "John Shepard",
    choice4: "Ada Lovelace",
    answer: 1
  },
  {
    question: " Pergunta Genérica 5",
    choice1: "Bill Gates",
    choice2: "Herman Hollerith",
    choice3: "Resposta",
    choice4: "Ada Lovelace",
    answer: 3
  }

];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Pergunta ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
