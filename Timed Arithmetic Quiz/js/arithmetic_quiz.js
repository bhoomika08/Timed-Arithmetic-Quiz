const selectors = {
  mainContainer: '#mainContainer',
  quizDiv: '[data-element="quizDiv"]',
  question: '[data-element="question"]',
  currentQuestion: '[data-element="questionNumber"]',
  inputAnswerField: '[data-element="answer"]',
  scoreDiv: '[data-element="scoreDiv"]',
  nextButton: '[data-element="submit_next"]',
  timeSpan: '[data-element="timeSpan"]',
  reportDiv: '[data-element="report"]',
}

class ArithmeticQuiz {
  constructor(quizParams, id, selectors) {
    this.getDomElements(id, selectors);
    this.questionnaire = [];
    this.questionsLimit = quizParams.questionsLimit;
    this.currentQuestion = -1;
    this.score = 0;
    this.inputAnswer = null;
    this.scoreType = null;
    this.type = null;
    this.timeDuration = quizParams.timeLimit;
    this.quizParams = quizParams;
  }

  getDomElements(id, selectors) { 
    this.$mainContainer = $(`${selectors.mainContainer}-${id}`);
    this.$quizDiv = this.$mainContainer.find(`${selectors.quizDiv}`);
    this.$currentQuestionNumber = this.$mainContainer.find(`${selectors.currentQuestion}`);
    this.$questionStatement = this.$mainContainer.find(`${selectors.question}`);
    this.$inputAnswerField = this.$mainContainer.find(`${selectors.inputAnswerField}`);
    this.$scoreDiv = this.$mainContainer.find(`${selectors.scoreDiv}`);
    this.$timeSpan = this.$mainContainer.find(`${selectors.timeSpan}`);
    this.$report = this.$mainContainer.find(`${selectors.reportDiv}`)
  }

  init() {
    this.createQuestions();
    this.bindEvents();
  }

  bindEvents() {
    let $startButton = quizHelper.createButton({
      'class': 'start button-default',
      text: 'Start Quiz',
    },
    { 'element': "startButton" }, 
    this.startQuiz.bind(this));
    this.$mainContainer.append($startButton);
    
    let $nextButton = quizHelper.createButton({
      'class': 'button-default',
      text: 'Submit & Next',
    },
    {'element': "submit_next" }, 
    this.displayNextQuestion.bind(this));
    this.$quizDiv.append($nextButton);
  }

  startQuiz() {
    $(event.target).remove();
    this.$quizDiv.show();
    this.displayQuestion();
  }

  createQuestions() {
    for(let i = 0; i < this.questionsLimit; i++) {
      let newQuestion = new Questions(this.quizParams.maxOperand);
      newQuestion.generateQuestion();
      newQuestion.setCorrectAnswer();
      this.questionnaire.push(newQuestion);
    }
  }

  displayQuestion() {
    this.startTimer();
    this.setQuestionNumber();
    this.$questionStatement.empty();
    this.$questionStatement.text(this.questionnaire[this.currentQuestion].mathQuestion);
    this.showScore();
    this.questionTimeout = setTimeout(() => {
      this.endTimer();
    }, 1000 * this.timeDuration);
  }

  startTimer() {
    this.quizTimer = new Timer(this.$timeSpan);
    this.quizTimer.startTime(this.timeDuration);
  }

  endTimer() {
    this.$inputAnswerField.val('');
    this.displayNextQuestion();
  }

  resetQuizTimer() {
    if (typeof (this.quizTimer||{}).clearTimer == 'function') {
      this.quizTimer.clearTimer();
    }
    if(this.questionTimeout) {
      clearTimeout(this.questionTimeout);
    }
    this.quizTimer = null;
  }

  setQuestionNumber() {
    this.$currentQuestionNumber.text(`Current Question: ${++this.currentQuestion + 1} / ${this.questionsLimit}`);
    this.questionnaire[this.currentQuestion].questionNumber = this.currentQuestion + 1;
  }

  getUserAnswer() {
    this.userAnswer = this.$inputAnswerField.val().trim();
    this.questionnaire[this.currentQuestion].inputAnswer = this.userAnswer;
    this.$inputAnswerField.val('');
  }

  displayNextQuestion() {
    this.resetQuizTimer();
    this.getUserAnswer();
    this.setScore();
    this.checkIfLastQuestion();
  }

  checkIfLastQuestion() {
    if(this.currentQuestion + 1 === this.questionsLimit) {
      this.doLastQuestionAction();
    } else {
      this.displayQuestion();
    }
  }

  doLastQuestionAction() {
    this.$quizDiv.hide();
    this.showScore();
    this.showSummaryReport();
  }

  setScore() {
    if(this.userAnswer) {
      if(this.questionnaire[this.currentQuestion].inputAnswer == this.questionnaire[this.currentQuestion].correctAnswer) {
        this.questionnaire[this.currentQuestion].scoreType = "correct";
        this.score++;
      } else {
        this.questionnaire[this.currentQuestion].scoreType = "incorrect";
      }
    } else {
      this.questionnaire[this.currentQuestion].inputAnswer = "Not Attempted";
      this.questionnaire[this.currentQuestion].scoreType = "na";
    }
  }

  showScore() {
    this.$scoreDiv.text(`Score: ${this.score}/${this.questionsLimit}`);
    this.$scoreDiv.show();
  }

  showSummaryReport() {
    this.summary = {
      correct: 0,
      incorrect: 0,
      notAttempted: 0,
    }
    this.questionnaire.map((questionData) => {
      if(questionData.scoreType === "correct") {
        this.summary.correct++;
      } else if(questionData.scoreType === "incorrect") {
        this.summary.incorrect++;
      } else {
        this.summary.notAttempted++;
      }
    });
   let $summary = quizHelper.createSummaryReport(this.quizParams, this.score, this.summary);
    
    let $viewDetailButton = quizHelper.createButton({
      text: "View Details",
      class: "button-default",
    }, 
    {'element': "viewDetail" },
    this.displayReport.bind(this));

    $summary.append($viewDetailButton);
    this.$report.append($summary);
    this.$report.show();
  }

  displayReport() {
    $(event.target).off('click');
    let incorrectAnswers = this.questionnaire.filter((questionData) => questionData.scoreType == "incorrect");
    let notAttemptedAnswers = this.questionnaire.filter((questionData) => questionData.scoreType == "na");
    
    this.createReportEntries(incorrectAnswers);
    this.createReportEntries(notAttemptedAnswers);
  }

  createReportEntries(answersByTypeArray) {
    let documentFragment = document.createDocumentFragment();
    for(let entry = 0; entry < answersByTypeArray.length; entry++) {
      let $reportEntry = quizHelper.createReportEntry(answersByTypeArray[entry]);
      documentFragment.append($reportEntry[0]);
    }
    this.$report.append(documentFragment);             
  }
}
