const defaultSettings = {
  questionLimit: 20,
  timeLimit: 10,
  maxOperand: 20,
}

class QuizParameters {
  constructor(defaultSettings) {
    this.defaultValues = defaultSettings;
    this.count = 0;
    this.quizConfigArray = [];
  }

  init() {
    this.bindEvents();
  }

  getDomElements(quizCount) {
    this.$quizParam = $(`#quizParam-${quizCount}`);
    this.$questionLimitInput = this.$quizParam.find("[data-element='questionsLimit']");
    this.$timeLimitInput = this.$quizParam.find("[data-element='timeDuration']");
    this.$maxOperandInput = this.$quizParam.find("[data-element='maxOperand']")
  }

  bindEvents() {
    $("#addQuiz").on("click", () => {
      let $quizParamDiv = quizHelper.createQuizParamContainer(++this.count);
      $(".quiz-list").append($quizParamDiv);
      this.disableButtons(false);
    });

    $("#removeQuiz").on("click", () => {
      $(`#quizParam-${this.count}`).remove();
      this.count--;
      if(this.count == 0) {
        this.disableButtons();
      }
    });

    $("#submit").on("click", () => {
      this.setQuizParameters();
      $(".quizParams").remove();
      this.getQuizContainer(this.quizConfigArray);
    });
  }

  setQuizParameters() {
    for(let quizCount = 1; quizCount <= this.count; quizCount++) {
      this.getDomElements(quizCount);
      let quizParams = {
        questionsLimit: parseInt(this.$questionLimitInput.val() || this.defaultValues.questionLimit, 10),
        timeLimit: parseInt(this.$timeLimitInput.val() || this.defaultValues.timeLimit, 10),
        maxOperand: parseInt(this.$maxOperandInput.val() || this.defaultValues.maxOperand, 10),
      };
      this.quizConfigArray.push(new QuizParamModel(quizParams));
    }
  }

  getQuizContainer(quizConfigArray) {
    for(let quizNum = 0; quizNum < quizConfigArray.length; quizNum++) {
      quizHelper.createQuizContainer(quizNum);
      let quiz = new ArithmeticQuiz(quizConfigArray[quizNum], quizNum, selectors);
      quiz.init();
    }
  }
  
  disableButtons(disable = true) {
    $("#remove").attr('disabled', disable);
    $("#submit").attr('disabled', disable);
  }
}

new QuizParameters(defaultSettings).init();
