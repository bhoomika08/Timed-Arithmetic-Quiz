class Questions {
  constructor(maxOperand) {
    this.firstOperand = null;
    this.secondOperand = null;
    this.operator = null;
    this.maxOperandValue = maxOperand;
    this.mathQuestion = '';
    this.correctAnswer = null;
    // FIXME_AB: I think question is an independent entity hence inputAnswer and scorePoint should not be its property.
    // B: added in quiz.js

    const OPERATORS = ['+', '-', '*', "/"];
    const helper = {
      generateOperand: () => parseInt(Math.random() * this.maxOperandValue),
      generateOperator: () => parseInt(Math.random() * OPERATORS.length),
    }
    this.helper = helper;
    this.OPERATORS = OPERATORS;
  }

  generateQuestion() {
    this.firstOperand = this.helper.generateOperand();
    // FIXME_AB: so zero can be an openrand ever? why.
    // B: Managed the case if second operand is zero.
    this.secondOperand = this.helper.generateOperand();
    let operatorNumber = this.helper.generateOperator();
    this.operator = this.OPERATORS[operatorNumber];
    this.mathQuestion = `${this.firstOperand} ${this.operator} ${this.secondOperand}`;
  }

  setCorrectAnswer() {
    switch(this.operator) {
      case '+': {
        this.correctAnswer = this.firstOperand + this.secondOperand;
        break;
      }
      case '-': {
        this.correctAnswer = this.firstOperand - this.secondOperand;
        break;
      }
      case '*': {
        this.correctAnswer = this.firstOperand * this.secondOperand;
        break;
      }
      case '/': {
        // FIXME_AB: with parseInt and parseFloat it is advisable to use second argument. Read docs for these two functions.
        // B: Used radix as second argument and managed the case if second operand is zero
        if (this.secondOperand == 0) {
          this.correctAnswer = "NA";
        } else {
          this.correctAnswer = parseInt(this.firstOperand / this.secondOperand, 10);
        }
        break;
      }
      default: {
        alert("wrong Operator");
      }
    }
  }
}
