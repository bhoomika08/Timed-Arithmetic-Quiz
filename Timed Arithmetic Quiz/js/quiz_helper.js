const quizHelper = {
  createQuizParamContainer: (divId) => {
    let $quizParamDiv = quizHelper.createDiv({ id: `quizParam-${divId}`, class: "quizParamContainer"});
    let $questionsLimitInput = quizHelper.createInputElement({name: "questionsLimit", label: "Questions Limit:"});
    let $timeDurationInput = quizHelper.createInputElement({name: "timeDuration", label: "Time Duration:"});
    let $maxOperandInput = quizHelper.createInputElement({name: "maxOperand", label: "Max Operand:"});
    
    return $quizParamDiv.append($questionsLimitInput, $timeDurationInput, $maxOperandInput);
  },
  
  createDiv: (attr, data = {}) => {
    let $div = $("<div>", attr);
    Object.keys(data).map(key => $div.attr(`data-${key}`, data[key]));
    return $div;
  },
  
  createInputElement: ({wrapperClass = "inputControl", name, label}) => {
    let $div = $("<div>", {class: wrapperClass});
    let $label = $(`<label for=${name}>${label} </label>`);
    let $input = $(`<input type="number" name='${name}' data-element='${name}'/>`);
    $div.append($label, $input);
    return $div;
  },

  createButton: (attr = {}, data = {}, click = function() {}) => {
    let $button = $("<button>", attr);
    Object.keys(data).map(key => $button.attr(`data-${key}`, data[key]));
    $button.on("click", () => click());
    return $button;
  },

  createQuizContainer: (quizId) => {
    $("body").append(`<div id="mainContainer-${quizId}" class="mainContainer">
      <div class="row hint highlight-red">
        <p class="hintLabel">For division: write answer in integer, not in float.</p>
        <p class="hintLabel">Enter NA  if division Not Possible</p>
      </div>
      <div data-element="quizDiv" class="hidden">
      <div data-element="timerDiv" class="time">
        <text>Time Remaining: <span data-element="timeSpan"></span> sec</text>
      </div>
        <p data-element="questionNumber"></p>
        <p data-element="question"></p>
        <label for="answer">Answer</label>
        <input type="text" data-element="answer"/><br><br>
      </div><br>
      <div data-element="scoreDiv" class="hidden"></div>
      <div data-element="report" class="hidden"></div>
    </div>`);
  },

  createSummaryReport: (data, score, summaryData) => {
    let $summary = $(`<div class="summary">
      <h2>Test Submitted</h2>
      <p class="">Total Questions: ${data.questionsLimit}</p>
      <p class="">Score: ${score}</p>
      <p class="">Correct Questions: ${summaryData.correct}</p>
      <p class="">Incorrect Questions: ${summaryData.incorrect}</p>
      <p class="">NA Questions: ${summaryData.notAttempted}</p>`
    );
    return $summary;
  },

  createReportEntry: (reportEntry) => {
    let $reportEntry = $(`<div>
      <p class='highlight-red' data-report='incorrectAnsNumber'>Question: ${reportEntry.questionNumber}</p>
      <p class='highlight-red' data-report='incorrectAnsQues'>${reportEntry.mathQuestion}</p>
      <p data-report='userAnswer'>Your Answer: ${reportEntry.inputAnswer}</p>
      <p data-report='correctAnswer'>Correct Answer: ${reportEntry.correctAnswer}</p>
      </div>`
    );
    return $reportEntry;
  },
};
