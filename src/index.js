document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");

  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  const questions = [
    new Question(
      "¿Cual es la verdadera edad de Jorge?",
      ["27", "undefined", "null", "number"],
      "undefined",
      1
    ),
    new Question(
      "¿Cual es el typeOf de patata?",
      ["undefined", "String", "tuberculo", "palabra preferida de Jorge"],
      "Palabra preferida de Jorge",
      1
    ),
    new Question(
      "Cuando Jorge dice que la clase se complica un poco:",
      ["Rezas a los dioses de JavaScript", "Te tiras por la ventana", "Lloras", "Te tomas algo para la ansiedad"],
      "Rezas a los dioses de JavaScript",
      2
    ),
    new Question(
      "¿Cual será nuestro proximo miniproyecto?",
      ["Un juego 3D de Pokemon", "Crear un Chatbot", "Aplicacion de reconocimiento de imagen", "Una calculadora cientifica"],
      "Un juego 3D de Pokemon",
      3
    ),
  
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();

  /************  TIMER  ************/

  let timer;

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  /************  FUNCTIONS  ************/

  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    questionContainer.innerText = question.text;

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    progressBar.style.width = `${
      ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100
    }%`; // This value is hardcoded as a placeholder

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`; //  This value is hardcoded as a placeholder

    console.log(quiz);
    console.log(question);

    question.choices.forEach((eachChoice, index) => {
      const newInputChoice = document.createElement("input");
      newInputChoice.setAttribute("type", "radio");
      newInputChoice.setAttribute("name", "choice");
      newInputChoice.setAttribute("id", `${eachChoice}`);
      choiceContainer.append(newInputChoice);

      const newLabelChoice = document.createElement("label");
      newLabelChoice.innerText = question.choices[index];
      newLabelChoice.setAttribute("for", `${eachChoice}`);
      choiceContainer.append(newLabelChoice);

      choiceContainer.append(document.createElement("br"));
      choiceContainer.append(document.createElement("br"));
    });
  }

  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer value

    const choicesInput = document.querySelectorAll(`input[name="choice"]`);

    choicesInput.forEach((eachChoices) => {
      if (eachChoices.checked === true) {
        selectedAnswer = eachChoices.value;
      }
    });

    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
    }
  }

  function showResults() {
    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored  ${quiz.correctAnswers}  out of  ${quiz.questions.length}  correct answers!`; // This value is hardcoded as a placeholder

    function eventHandler() {
      endView.style.display = "none";
      quizView.style.display = "block";
      quiz.currentQuestionIndex = 0;
      quiz.correctAnswers = 0;
      quiz.shuffleQuestions();
      showQuestion();
    }

    document
      .querySelector("#restartButton")
      .addEventListener("click", eventHandler);
  }

  
  function formatTime() {
    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

    // Display the time remaining in the time remaining container
    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }

  function updateCounter() {
    quiz.timeRemaining--;
    formatTime();

    if (quiz.timeRemaining < 0) {
      clearInterval(interval);
      timeRemaining.innerText = "Time Done";
      showResults();
    }
  }

  const interval = setInterval(updateCounter, 1000);
});
