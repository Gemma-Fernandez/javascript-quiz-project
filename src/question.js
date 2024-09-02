class Question {
    // YOUR CODE HERE:
    
    constructor (text, choices, answer, difficulty){
        this.text= text;
        this.choices=choices;
        this.answer=answer;
        this.difficulty=difficulty;
    }

    shuffleChoices() {
    
    for(let i = this.choices.length-1; i>= 0; i--) {
        let j = Math.floor(Math.random() * this.choices.length);
             [ this.choices[i],  this.choices[j]] = [
                this.choices[j],  this.choices[i]];
        }

    }
}
