const quizHelper = {
  createQuizParamContainer: (divId) => {
    let $quizParamDiv = quizHelper.createDiv({ id: `quizParam-${divId}`, class: "container"});
    let $questionsLimitInput = quizHelper.createInputElement({name: "questionsLimit", label: "Questions Limit:", inputType: "number"});
    let $timeDurationInput = quizHelper.createInputElement({name: "timeDuration", label: "Time Duration:", inputType: "number"});
    let $maxOperandInput = quizHelper.createInputElement({name: "maxOperand", label: "Max Operand:", inputType: "number"});
    
    return $quizParamDiv.append($questionsLimitInput, $timeDurationInput, $maxOperandInput);
  },
  
  createDiv: (attr = {}, data = {}) => {
    let $div = $("<div>", attr);
    Object.keys(data).map(key => $div.attr(`data-${key}`, data[key]));
    return $div;
  },
  
  createInputElement: ({wrapperClass = "inputControl", name, label, inputType}) => {
    let $div = $("<div>", {class: wrapperClass});
    let $label = $(`<label for='${name}'>${label} </label>`);
    let $input = $(`<input type='${inputType}' name='${name}' data-element='${name}'/>`);
    $div.append($label, $input);
    return $div;
  },

  createButton: (attr = {}, data = {}, click = function() {}) => {
    let $button = $("<button>", attr);
    Object.keys(data).map(key => $button.attr(`data-${key}`, data[key]));
    $button.on("click", () => click());
    return $button;
  },

  createParagraph: (attr = {}, data = {}) => {
    let $para = $("<p>", attr);
    Object.keys(data).map(key => $para.attr(`data-${key}`, data[key]));
    return $para;
  },

  createQuizContainer: (quizId) => {
    let $mainContainer = '',
        $noteDiv = '',
        $hintText = '',
        $quizDiv = '',
        $timerDiv = '',
        $timeText = '',
        $timeSpan = '',
        $secText = '',
        $questionNum = '',
        $quesStatement = '',
        $answer = '',
        $scoreDiv = '',
        $reportDiv = '';

    $mainContainer = quizHelper.createDiv({
      id: `mainContainer-${quizId}`,
      class: "mainContainer",
    });
  
    $noteDiv = quizHelper.createDiv();
    $hintText = quizHelper.createParagraph({
      class: "highlight-red",
      html: `For division: write answer in integer, not in float.<br>
      Enter NA  if division Not Possible.`,
    });

    $quizDiv = quizHelper.createDiv({class: "hidden container" }, {element: "quizDiv" });

    $timerDiv = quizHelper.createDiv({class: "time" }, {element: "timerDiv" });
    $timeText = $("<text>", {
      text: "Time Remaining: ",
    })
    $timeSpan = $("<span>", {
      "data-element": "timeSpan",
    });
    $secText = $("<text>", {
      text: "sec",
    });

    $questionNum = quizHelper.createParagraph({}, {element: "questionNumber" });
    $quesStatement = quizHelper.createParagraph({}, {element: "question" });
    $answer = quizHelper.createInputElement({
      wrapperClass: "answer-container",
      name: "answer",
      label: "Answer: ",
      inputType: "text",
    });

    $scoreDiv = quizHelper.createDiv({class: "hidden" }, {element: "scoreDiv" });

    $reportDiv = quizHelper.createDiv({class: "hidden" },{element: "report" });

    $noteDiv.append($hintText);
    $timerDiv.append($timeText, $timeSpan, $secText);
    $quizDiv.append($timerDiv, $questionNum, $quesStatement, $answer);
    $mainContainer.append($noteDiv, $quizDiv, $scoreDiv, $reportDiv);
    
    return $mainContainer;
  },

  createSummaryReport: (data, score, summaryData) => {
    let $summary = '',
        $heading = '',
        $totalQues = '',
        $score = '',
        $correctQues = '',
        $incorrectQues = '',
        $naQues = '';

    $summary = quizHelper.createDiv();
    $heading = $("<h2>", {
      text: "TestSubmitted",
    });
    $totalQues = quizHelper.createParagraph({text: `Total Questions: ${data.questionsLimit}`});
    $score = quizHelper.createParagraph({text: `Score: ${score}`});
    $correctQues = quizHelper.createParagraph({text: `Correct Questions: ${summaryData.correct}`});
    $incorrectQues = quizHelper.createParagraph({text: `Incorrect Questions: ${summaryData.incorrect}`});
    $naQues = quizHelper.createParagraph({text: `NA Questions: ${summaryData.notAttempted}`});

    $summary.append($heading, $totalQues, $score, $correctQues, $incorrectQues, $naQues);
    return $summary;
  },

  createReportEntry: (reportEntry) => {
    let $reportEntry = '',
        $quesNum = '',
        $quesStatement = '',
        $inputAns = '',
        $correctAns = '';

    $reportEntry = quizHelper.createDiv();
    $quesNum = quizHelper.createParagraph({
      class: 'highlight-red',
      text: `Question: ${reportEntry.questionNumber}`,
    });
    $quesStatement = quizHelper.createParagraph({
      class: 'highlight-red',
      text: `${reportEntry.mathQuestion}`,
    });
    $inputAns = quizHelper.createParagraph({
      text: `Your Answer: ${reportEntry.inputAnswer}`,
    });
    $correctAns = quizHelper.createParagraph({
      text: `Correct Answer: ${reportEntry.correctAnswer}`,
    });
    return $reportEntry.append($quesNum, $quesStatement, $inputAns, $correctAns);
  },
};
