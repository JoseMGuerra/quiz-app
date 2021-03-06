/*jshint esversion: 6 */
/**
 * @const {gameData} Quiz data base.
 */
const gameData = [
  {
    question:
      'A small bunch of herbs, tied together, that is added to stews or casseroles for flavour.',
    answers: ['Bouquet garni', 'Crudité', 'Beignet', 'Tuile'],
    correct: 1,
  },
  {
    question:
      'French-style, bite-sized sweetmeats and cakes served with coffee.',
    answers: ['Coulis', 'Crêpe', 'Petits fours', 'Canapé'],
    correct: 3,
  },
  {
    question:
      'A French term describing the continual tossing of food in shallow fat so that it browns evenly.',
    answers: ['Pan frying', 'Basting', 'Sautéeing', 'Braising'],
    correct: 3,
  },
  {
    question:
      'Extracting the flavours of spices or herbs by soaking them in liquid heated in a covered pan.',
    answers: ['Blanching ', 'Curdling', 'Brine', 'Infusing'],
    correct: 4,
  },
  {
    question:
      'A French dish that has been sprinkled with sugar and grilled until a caramelized crust has formed on top.',
    answers: ['Julienne', 'Brulée', 'Caramel', 'Flambé'],
    correct: 2,
  },
  {
    question:
      'An activity often used to assess the skills and training of a cooking job candidate.',
    answers: ['Barding', 'Practice', 'Sharpen', 'Stage'],
    correct: 4,
  },
  {
    question:
      'The preparation of a meal from whatever ingredients happen to be on hand.',
    answers: ['Bricolage', 'Once-a-month cooking', 'Pairing', 'Whip'],
    correct: 1,
  },
  {
    question:
      'Cooking food, usually vegetables, very gently in melted fat to release juices for flavour, but without allowing the food to brown.',
    answers: ['Tossing', 'Sweating', 'Stirring ', 'Folding'],
    correct: 2,
  },
  {
    question:
      'To loosen the brown bit from a pan by adding liquid and then scraping the bits off the pan.',
    answers: ['Dredge', 'Caramelize', 'Deglaze', 'Scrape'],
    correct: 3,
  },
  {
    question:
      'To cook the fat out of meat or poultry over a low heat, in order to preserve the drippings.',
    answers: ['Render', 'confit', 'Reduce', 'Roux'],
    correct: 1,
  },
];
/**
 * Variables of Selected HTML elements
 */
const slideNav = document.querySelector('#slideNav');
const openBtn = document.querySelector('.open-button');
const closeBtn = document.querySelector('.close-button');
const about = document.querySelector('.about');
const aboutText = document.querySelector('.about-text');
const closeAbout = document.querySelector('.close-about');
const bannerText = document.querySelector('#banner');
const welcomeText = document.querySelector('#welcomeText');
const feedbackText = document.querySelector('#feedback-text');
let userName = document.querySelector('#username');
const nextButton = document.querySelector('#next-button');
const tryAgainButton = document.querySelector('#reload-button');
const quizContainer = document.querySelector('#quiz-container');
const questionText = document.querySelector('#question');
const modalMessage = document.querySelector('#modal-message');
const answersContainer = document.querySelector('#answers-container');
const scoreCard = document.querySelector('#score-card');
const answer1 = document.querySelector('#answer1');
const answer2 = document.querySelector('#answer2');
const answer3 = document.querySelector('#answer3');
const answer4 = document.querySelector('#answer4');

let questionIndex, scoreIndex, shuffleData;

/**
 * Wait for the DOM to finish loading before running the game.
 */
function loadDom() {
  document.addEventListener('DOMContentLoaded', () => {
    aboutText.style.display = 'none';
  });
}
loadDom();

/**
 * Nav bar
 */
function openNav() {
  openBtn.addEventListener('click', e => {
    slideNav.style.width = '200px';
    openBtn.style.display = 'none';
    setTimeout(() => {
      slideNav.style.width = '0';
    }, 4500);
    setTimeout(() => {
      openBtn.style.display = 'block';
    }, 4800);
  });
}
openNav();

function closeNav() {
  closeBtn.addEventListener('click', e => {
    slideNav.style.width = '0';
    openBtn.style.display = 'block';
  });
}
closeNav();
/**
 * About section.
 * Open and close modal.
 */
function aboutSection() {
  about.addEventListener('click', e => {
    aboutText.style.display = 'block';
    setTimeout(() => {
      aboutText.style.display = 'none';
    }, 12000);
  });
  closeAbout.addEventListener('click', e => {
    aboutText.style.display = 'none';
  });
}
aboutSection();

/**
 * Add evenListener to answer buttons select each individually by their ID.
 */
function activateButtons() {
  answersContainer.querySelectorAll('.answer-button').forEach((button, key) => {
    button.addEventListener('click', selectedAnswer);
    button.answerId = key + 1;
  });
}
/**
 * Remove eventListener after question has been answered.
 */
function deactivateButtons() {
  answersContainer.querySelectorAll('.answer-button').forEach((button, key) => {
    button.removeEventListener('click', selectedAnswer);
    button.answerId = key + 1;
  });
}

function hideQuiz() {
  quizContainer.style.display = 'none';
}
hideQuiz();

function displayQuiz() {
  quizContainer.style.display = 'flex';
}
function hideAnswerContainer() {
  answersContainer.style.display = 'none';
}

/**
 * This hides Next button in between question to avoid skipping question without answering them.
 */
function hideNexButton() {
  nextButton.style.display = 'none';
}
/**
 * Next button is displayed so the user can move into the next question of the quiz.
 */
function displayNexButton() {
  nextButton.style.display = 'flex';
}
/**
 * This will hide Username Input and Start button, and display the Quiz questions as well as answer buttons  and Score area.
 * It will display a welcome message with the chosen username.
 * It will hide quiz banner text.
 * It will hide try again button to avoid page reload without answering all the questions.
 */
function startGame() {
  shuffleData = gameData.sort(() => Math.random() - 0.5);
  questionIndex = 0;
  scoreIndex = 0;
  activateButtons();
  hideNexButton();
  bannerText.textContent = '';
  welcomeText.textContent = '';
  userName = localStorage.getItem('username');
  feedbackText.textContent = `Hello ${userName}, welcome!`;
  tryAgainButton.style.display = 'none';
  displayQuiz();
}

/**
 * This will initiate the quiz iterating through questions and answers.
 * Shuffle questions.
 *
 */
function startQuiz() {
  const currentGameData = gameData[questionIndex];
  if (questionIndex < gameData.length) {
    questionText.innerText = `${questionIndex + 1}. ${currentGameData.question}

`;
    answer1.innerHTML = currentGameData.answers[0];
    answer2.innerHTML = currentGameData.answers[1];
    answer3.innerHTML = currentGameData.answers[2];
    answer4.innerHTML = currentGameData.answers[3];
  } else {
    hideAnswerContainer();
    hideNexButton();
    questionText.style.display = 'none';
    feedbackText.innerText = `Thank you for taking my quiz ${userName}`;
    welcomeText.textContent = 'Quiz Completed!';
    tryAgainButton.style.display = 'flex';
  }
}
/**
 * Check that the button pressed is linked with the correct answer.
 * If it is correct,increments score by one and changes background color to green.
 * Otherwise will change background color to red .
 */
function selectedAnswer(e) {
  let currentQuestion = gameData[questionIndex];
  let currentButton = e.currentTarget.answerId;
  const currentAnswer = currentQuestion.correct;
  let isCorrect = currentAnswer === currentButton;
  if (isCorrect) {
    scoreIndex++;
    quizContainer.style.backgroundColor = 'green';
    currentScore();
  } else {
    quizContainer.style.backgroundColor = 'red';
  }
  displayNexButton();
  deactivateButtons();
}
/**
 * Next Question index.
 * Reset quiz container background color.
 * Call hide next button.
 * Call activate question buttons.
 * Call full Score if full score is achieved.
 *
 */
function next() {
  nextButton.addEventListener('click', () => {
    questionIndex++;
    quizContainer.style.backgroundColor = '';
    activateButtons();
    hideNexButton();
    startQuiz();
    fullScore();
  });
}
next();

function restart() {
  tryAgainButton.addEventListener('click', () => {
    aboutText.style.display = 'none';
    window.location.reload();
  });
}
restart();

/**
 * Calculates Score by comparing number questions that had been answered correctly against the total amount.
 */
function currentScore() {
  scoreCard.textContent = `${scoreIndex}/${gameData.length}`;
}
/**
 * Displays a thank you message using the user name.
 */
function thankYouMessage() {
  feedbackText.textContent = `Thank you for taking my Quiz ${userName}!`;
}
/**
 * This will display a Modal  message if the user answers all questions correctly.
 */
function fullScore() {
  if (scoreIndex === gameData.length) {
    modalMessage.classList.add('active');
    hideQuiz();
    setTimeout(() => {
      modalMessage.classList.remove('active');
    }, 3300);
    setTimeout(() => {
      displayQuiz();
      thankYouMessage();
    }, 3300);
  }
}
startGame();
startQuiz();
