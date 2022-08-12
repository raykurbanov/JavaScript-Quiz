// Initial Data ---------------------------------------------->

let data = [
  (question1 = {
    0: "Less server interaction",
    1: "Immediate feedback to the visitors",
    2: "Increased interactivity",
    3: "All of the above.",
    answer: "All of the above.",
    question: "Which of the following is an advantage of using JavaScript?",
  }),
  (question2 = {
    0: "Using typeof operator",
    1: "Using getType function",
    2: "Both of the above.",
    3: "None of the above.",
    answer: "Using typeof operator",
    question: "How can you get the type of arguments passed to a function?",
  }),
  (question3 = {
    0: "while()",
    1: "loop()",
    2: "forEach()",
    3: "None of the above.",
    answer: "forEach()",
    question:
      "Which built-in method calls a function for each element in the array?",
  }),
  (question4 = {
    0: "var book = Object();",
    1: "var book = new Object();",
    2: "var book = new OBJECT();",
    3: "var book = new Book();",
    answer: "var book = new Object();",
    question: "Which of the following code creates an object?",
  }),
  (question5 = {
    0: "toString()",
    1: "valueOf()",
    2: "toLocaleString()",
    3: "toPrecision()",
    answer: "valueOf()",
    question:
      "Which of the following function of Number object returns the number's value?",
  }),
  (question6 = {
    0: "lastIndexOf()",
    1: "search()",
    2: "substr()",
    3: "indexOf()",
    answer: "lastIndexOf()",
    question:
      "Which of the following function of String object returns the index within the calling String object of the last occurrence of the specified value?",
  }),
  (question7 = {
    0: "toLocaleLowerCase()",
    1: "toLowerCase()",
    2: "toString()",
    3: "substring()",
    answer: "toLowerCase()",
    question:
      "Which of the following function of String object returns the calling string value converted to lower case?",
  }),
  (question8 = {
    0: "sup()",
    1: "small()",
    2: "strike()",
    3: "sub()",
    answer: "strike()",
    question:
      "Which of the following function of String object causes a string to be displayed as struck-out text, as if it were in a <strike> tag?",
  }),
  (question9 = {
    0: "pop()",
    1: "push()",
    2: "reduce()",
    3: "reduceRight()",
    answer: "reduce()",
    question:
      "Which of the following function of Array object applies a function simultaneously against two values of the array (from left-to-right) as to reduce it to a single value?",
  }),
  (question10 = {
    0: "toSource()",
    1: "splice()",
    2: "toString()",
    3: "unshift()",
    answer: "toSource()",
    question:
      "Which of the following function of Array object represents the source code of an object?",
  }),
];

let scores = {
  studentName: "",
  studentScore: "",
};

let userScore = [];
let initialTime;
let initialScore;
let initialQuestionNumber;
let questionNum;
let interval;
let time = document.querySelector("#time");
let questions = document.querySelector("#questions");
let p = document.querySelector("p");
let mainHeader = document.querySelector(".main");
let startButton = document.querySelector("#startQuiz");
let list = document.querySelector(".list");
let listItem = document.querySelector(".list-item");
let allListItems = document.querySelectorAll("li");
let input = document.querySelector("#name");
let label = document.querySelector("#label");
label.htmlFor = "name";
let submit = document.querySelector("#submit");
let back = document.querySelector("#back");
let clear = document.querySelector("#clear");
let scoresList = document.querySelector("#scoresList");
let background = document.querySelector("#image");
let viewScores = document.querySelector("#scores");
let result = document.querySelector("#result");
result.classList.add("hide");
let container = document.querySelector(".container");
let containerItem = document.querySelector("containeritem");
let progress = document.querySelector(".progress");
let buttonInterval;

// functions ------------------------------------------------->

function initialConditions() {
  initialTime = 150;
  initialScore = 0;
  questionNum = 0;
}

function initiateRender() {
  initialConditions();

  interval = setInterval(() => {
    initialTime = initialTime - 1;
    let min = Math.floor(initialTime / 60);
    let seconds = initialTime - min * 60;
    if (min < 1) {
      time.innerText = `Time: ${seconds}s`;
    } else {
      time.innerText = `Time: ${min}min ${seconds}s`;
    }

    if (initialTime == 0) {
      time.classList.add("hide");
      finalPage();
    }
  }, 1000);
  renderQuiz();
}

function renderQuiz() {
  questions.innerHTML = `Question: ${questionNum + 1}`;
  progress.children[questionNum].classList.add("active");
  document.querySelector("#paragraph").classList.add("hide");
  mainHeader.innerHTML = data[questionNum].question;
  mainHeader.setAttribute("style", "height: 60px");
  [(p, startButton)].forEach((el) => el.classList.add("hide"));
  container.classList.remove("hide");

  list.classList.remove("hide");
  let allLinks = document.querySelectorAll("a");
  for (let i = 0; i < 4; i++) {
    allLinks[i].innerText = data[questionNum][i];
  }
}

function finalPage() {
  clearInterval(interval);
  [label, input, submit, questions].forEach((el) =>
    el.classList.remove("hide")
  );
  document.querySelectorAll(".containeritem").forEach((el) => {
    el.classList.remove("active", "finished");
  });
  [mainHeader, time, list, container].forEach((el) => el.classList.add("hide"));

  questions.innerHTML = "All Done!";
  p.classList.remove("hide");
  p.innerHTML = `Your Score: ${initialScore}`;
  input.focus();
}

function renderScore() {
  scoresList.classList.remove("hide");
  if (input.value) {
    scores.studentName = input.value;
    scores.studentScore = initialScore;

    [label, input, submit, p].forEach((el) => el.classList.add("hide"));
    questions.innerHTML = "High Scores";
    localStorage.setItem("userScore", JSON.stringify(scores));
    userScore.push(JSON.parse(localStorage.getItem("userScore")));

    let scoreListItem = document.createElement("li");
    scoreListItem.classList.add("scoreList");
    scoresList.append(scoreListItem);
    scoreListItem.innerText = `Name: ${
      userScore[userScore.length - 1].studentName
    } / Score: ${userScore[userScore.length - 1].studentScore} `;
    scoresList.append(scoreListItem);

    [clear, back].forEach((el) => el.classList.remove("hide"));
    input.value = "";
  }
}

function clearScores() {
  userScore = [];
  let scoreListItems = document.querySelectorAll(".scoreList");
  scoreListItems.forEach((el) => el.remove());
  scoresList.classList.add("hide");
  clear.setAttribute("disabled", "");
  localStorage.clear();
}

function mainMenu() {
  mainHeader.setAttribute("style", "height: 30px");
  clearInterval(interval);
  clear.removeAttribute("disabled");
  [back, clear, scoresList].forEach((el) => el.classList.add("hide"));
  [time, mainHeader, p, startButton, questions].forEach((el) =>
    el.classList.remove("hide")
  );
  questions.innerText = "Questions: 10";
  mainHeader.innerHTML = "Coding Quiz Challenge";
  time.innerHTML = "Time: 2min 30s";
  p.innerText =
    "Following quiz provides Multiple Choice Questions (MCQs) related to JavaScript Framework. You will have to read all the given answers and click over the correct answer.";
}

// Core logic for test ---------------------------------------->

allListItems.forEach((el) =>
  el.addEventListener("click", (e) => {
    let interval = setTimeout(() => {
      if (questionNum < data.length - 1) {
        if (e.target.innerText == data[questionNum].answer) {
          result.classList.remove("hide");
          result.innerHTML = "CORRECT!";
          setTimeout(() => {
            result.classList.add("hide");
          }, 1000);
          initialScore = initialScore + 100 / data.length;
          progress.children[questionNum].classList.add("finished");
          questionNum++;
          renderQuiz();
        } else {
          result.classList.remove("hide");
          result.innerHTML = "WRONG!";
          setTimeout(() => {
            result.classList.add("hide");
          }, 1000);
          progress.children[questionNum].classList.add("finished");
          questionNum++;

          if (initialTime > 0) {
            initialTime = initialTime - (initialTime % 10);
            renderQuiz();
          } else {
            clearInterval(interval);
            finalPage();
          }
        }
      } else {
        initialScore = initialScore + 100 / data.length;
        clearInterval(interval);
        finalPage();
      }
    }, 500);
  })
);

//Event Listeners ---------------------------------------------->

startButton.addEventListener("click", initiateRender);

submit.addEventListener("click", () => {
  if (input.value) {
    renderScore();
  }
});

clear.addEventListener("click", clearScores);

back.addEventListener("click", mainMenu);

viewScores.addEventListener("click", () => {
  if (userScore.length == 0) {
    alert("No scores available at the moment!");
  } else {
    [
      label,
      input,
      submit,
      questions,
      mainHeader,
      startButton,
      list,
      time,
      container,
    ].forEach((el) => el.classList.add("hide"));
    clearInterval(interval);
    renderScore();
    [back, clear].forEach((el) => el.classList.remove("hide"));
    p.innerHTML = "High Scores";
  }
});
