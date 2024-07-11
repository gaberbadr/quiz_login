
//start quize/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Select Elements
let countSpan = document.querySelector(".count span");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let timer = document.querySelector(".time");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");
let widthspancontainer = document.querySelector(".bar");
let widthspan = document.querySelector(".bar div");
let widthspannumber =document.querySelector(".bar div span");
let color = document.querySelector(".option-box");

// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;


function getQuestions() {
  fetch('../json/questions.json')
    .then(response => response.json())
    .then(questionsObject => {
      let qCount = questionsObject.length;

      // Create Bullets + Set Questions Count
      expandspan(qCount);

      // Add Question Data
      addQuestionData(questionsObject[currentIndex], qCount);

      // Start CountDown
      countdown(20, qCount);

      // Click On Submit
      submitButton.onclick = () => {
        // Get Right Answer
        let theRightAnswer = questionsObject[currentIndex].right_answer;

        // Increase Index
        currentIndex++;

        // Check The Answer
        checkAnswer(theRightAnswer);

        // Remove Previous Question
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";

        // Add Question Data
        addQuestionData(questionsObject[currentIndex], qCount);

        // Handle expandspan
        expandspan(qCount);

        // Show Results
        showResults(qCount);

        if (currentIndex === 8) {
          submitButton.textContent = "See The Result";
          submitButton.style.setProperty("background-color", "red");
        }
      };
    })
    .catch(error => console.error('Error fetching JSON:', error));
}

getQuestions();

function expandspan(qCount) {
  countSpan.innerHTML = qCount;
if (currentIndex < qCount) {
  widthspan.style.setProperty("width",`${((currentIndex+1)/qCount)*100}%`);
widthspannumber.textContent =`question : ${currentIndex+1}`;
}
}



function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // Create H2 Question Title
    let questionTitle = document.createElement("h2");

    // Create Question Text
    let questionText = document.createTextNode(obj["title"]);

    // Append Text To H2
    questionTitle.appendChild(questionText);

    // Append The H2 To The Quiz Area
    quizArea.appendChild(questionTitle);

    // Create The Answers
    for (let i = 1; i <= 4; i++) {
      // Create Main Answer Div
      let mainDiv = document.createElement("div");

      // Add Class To Main Div
      mainDiv.className = "answer";

      // Create Radio Input
      let radioInput = document.createElement("input");

      // Add Type + Name + Id + Data-Attribute
      radioInput.name = "question"; // give all the same name to can select only one radio from the answer
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.setAttribute("data-answer", obj[`answer_${i}`]);

      // Create Label
      let theLabel = document.createElement("label");

      // Add For Attribute
      theLabel.htmlFor = `answer_${i}`;

      // Create Label Text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);

      // Add The Text To Label
      theLabel.appendChild(theLabelText);

      // Add Input + Label To Main Div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      // Append All Divs To Answers Area
      answersArea.appendChild(mainDiv);
    }
  }
}

function checkAnswer(rAnswer) {
  let answers = document.getElementsByName("question"); // four answer of the obj, becuse the four answer has the same atteibute name
  let theChoosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].getAttribute("data-answer"); // the value of answer storge in the raduio attribute call data-answer
    }
  }

  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
  }
}


function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countdownElement.innerHTML =`Time : ${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        //click the buttom until make the quiz finsh ,number of clicks he tap = from number of currentIndex to count
      for(let i = currentIndex; i < count; i++){
        submitButton.click();
      };
      }
    }, 1000);
  }
}

function showResults(count) {
  let theResults;
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    timer.remove();
    widthspancontainer.remove();
    color.remove();

    resultsContainer.style.setProperty("display","block");
    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<span><span class="good">Good</span> , ${rightAnswers} From ${count}</span>`;
    } else if (rightAnswers === count) {
      theResults = `<span><span class="perfect">Perfect</span> , All Answers Is Good</span>`;
    } else {
      theResults = `<span><span class="bad">Bad</span> , ${rightAnswers} From ${count}</span>`;
    }

    resultsContainer.innerHTML = theResults;
    document.querySelector(".quiz-app").style.setProperty("margin-top","200px");
}
}

/////colors
// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

// If There's Color Item In Local Storage
if (mainColors !== null) {

  // console.log('Local Storage Is Not Empty You Can Set It On Root Now');
  // console.log(localStorage.getItem("color_option"));

  document.documentElement.style.setProperty('--main-color', mainColors);

  // Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach(element => {

    element.classList.remove("active");

    // Add Active Class On Element With Data-Color === Local Storage Item
    if (element.dataset.color === mainColors) {

      // Add Active Class
      element.classList.add("active");

    }

  });
}

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items
colorsLi.forEach(li => {

  // Click On Every List Items
  li.addEventListener("click", (e) => {

    // Set Color On Root
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);

  });

});

// Handle Active State
function handleActive(ev) {

  // Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {

    element.classList.remove("active");

  });

  // Add Active Class On Self
  ev.target.classList.add("active");

}


//end quize/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////