class Quiz {
  // YOUR CODE HERE:

  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i >= 0; i--) {
      let j = Math.floor(Math.random() * this.questions.length);
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
  }

  checkAnswer(answer) {
    if (answer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty){
      if (difficulty >= 0 && difficulty <= 3) {
          let newArray = this.questions.filter( element => element.difficulty === difficulty)
          this.questions = newArray
      }
  }

  averageDifficulty() {
  let sum = this.questions.reduce((accumulador, element) => accumulador + element.difficulty, 0)
  let average = sum / this.questions.length
  return average
  }

  
}