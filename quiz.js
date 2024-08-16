const questions  = [
    {
      // QUESTIONS ONLY FOR TESTING 
        question: "WHICH  OF THE FOLLOWING LANGUAGE IS USED TO CREATE PYTHON LANGUAGE?",
        answers: [
            {text : "A. c",   correct :true},
            {text: "B.  c++", correct:false},
            {text:" C.Java ",  correct :false },
            {text:"D. Python",    correct: false },  
         ]
    },
    {
      //QUESTIONS ONLY FOR TESTING
        question:"WHO IS THE FOUNDER OF C++?",
        answers:[
            {text :"A .Dennis Ritche",correct:false},
            {text :"B. Bjarne Stroustrup",correct :true},
            {text :"c.Ken Thomsan", correct : false},
            {text :"D. Brian Kernighn", correct:false},
        ] 
    },
    {
        question:"WHO IS THE FOUNDER  OF JAVA ? ",
        answers:[
            {text :"A. Dennis Ritche",correct:false},
            {text :"B.James Gosling",correct :true},
            {text :"C.Ken Thomsan", correct : false},
            {text :"D.Brian Kernighn", correct:false},
        ] 
    },
    {
        question:"WHO IS THE FOUNDER  OF JAVA ? ",
        answers:[
            {text :"A. Dennis Ritche",correct:false},
            {text :"B. James Gosling",correct :true},
            {text :"C. Ken Thomsan", correct : false},
            {text :"D. Brian Kernighn", correct:false},
        ] 
    },
]; 
//v
const questionElement = document.getElementById("question");
const answerButtons =  document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
//score
let currentQuestionIndex =0;
let score = 0;

function startButton()
{
  document.getElementById('quiz-content').style.display = 'block';
  document.getElementById('app').style.display='block';
 startQuiz();
 document.getElementById('start-btn').style.display = 'none';
 document.getElementById('start-btn').addEventListener('click', function() {
 
});
}

window.addEventListener('load', () => {

  audio.pause();

   
 finishTimer();
});
//STFN
function startQuiz(){
    currentQuestionIndex = 0;
    score =0;
    nextButton.innerHtml = "NEXT";
    showQuestion()
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion
    .question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

}
function resetState(){
  // show content
document.getElementById("content").classList.remove("hide");
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
             button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display ="block";
    stopTimer();
    finishTimer();
}

 function showScore(){
    resetState();
    questionElement.innerHTML = ` SLOT 1 SCORED  :   ${score}   OUT OF   ${questions.length}!`;
    nextButton.innerHTML = "NEXT";
    nextButton.style.display ="block";
    document.getElementById('HOME').style.display='block';
    document.getElementById('next-btn').style.display='none';
 }
  function NextButton(){
     currentQuestionIndex++;
     if(currentQuestionIndex < questions.length){
        resetTimer();
        showQuestion();
     }else{
        showScore();
        stopTimer();
        finishTimer();
      
     }
  }
    nextButton.addEventListener("click", ()=>{
        if(currentQuestionIndex < questions.length){
           
            NextButton();
        }else{
            startQuiz();
            stopTimer();
        }
    });

    
startQuiz();
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function stopTimer() {
    clearInterval(timerInterval);

   }
   const FULL_DASH_ARRAY = 283;
   const WARNING_THRESHOLD = 10;
   const ALERT_THRESHOLD = 5;
   
   const COLOR_CODES = {
     info: {
       color: "green",
     },
     warning: {
       color: "orange",
       threshold: WARNING_THRESHOLD
       
     },
     alert: {
       color: "red",
       threshold: ALERT_THRESHOLD
     }
   };
   
   const TIME_LIMIT = 15;
   let timePassed = 0;
   let timeLeft = TIME_LIMIT;
   let timerInterval = null;
   let remainingPathColor = COLOR_CODES.info.color;
   
   document.getElementById("app").innerHTML = `
   <div class="base-timer">
     <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
       <g class="base-timer__circle">
         <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
         <path
           id="base-timer-path-remaining"
           stroke-dasharray="283"
           class="base-timer__path-remaining ${remainingPathColor}"
           d="
             M 50, 50
             m -45, 0
             a 45,45 0 1,0 90,0
             a 45,45 0 1,0 -90,0
           "
         ></path>
       </g>
     </svg>
     <span id="base-timer-label" class="base-timer__label">15</span>
   </div>
   `;
   
   startTimer();
   
   function onTimesUp() {
     clearInterval(timerInterval);
     showCallout();
   }
   
   function startTimer() {
     timerInterval = setInterval(() => {
       timePassed = timePassed += 1;
       timeLeft = TIME_LIMIT - timePassed;
       startTimerSound();
       document.getElementById("base-timer-label").innerHTML = formatTime(
         timeLeft
       );
       setCircleDasharray();
       setRemainingPathColor(timeLeft);
   
       if (timeLeft === 0) {
         finishTimer();
         onTimesUp();
       }
     }, 1000);
   }
   
   function formatTime(time) {
     let seconds = time % 60;
   
     if (seconds < 10) {
       seconds = `0${seconds}`;
     }
   
     return `${seconds}`;
   }
   
   function setRemainingPathColor(timeLeft) {
     const { alert, warning, info } = COLOR_CODES;
     if (timeLeft <= alert.threshold) {
       document
         .getElementById("base-timer-path-remaining")
         .classList.remove(warning.color);
       document
         .getElementById("base-timer-path-remaining")
         .classList.add(alert.color);
     } else if (timeLeft <= warning.threshold) {
       document
         .getElementById("base-timer-path-remaining")
         .classList.remove(info.color);
       document
         .getElementById("base-timer-path-remaining")
         .classList.add(warning.color);
     }
   }
   
   function calculateTimeFraction() {
     const rawTimeFraction = timeLeft / TIME_LIMIT;
     return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
   }
   
   function setCircleDasharray() {
     const circleDasharray = `${(
       calculateTimeFraction() * FULL_DASH_ARRAY
     ).toFixed(0)} 283`;
     document
       .getElementById("base-timer-path-remaining")
       .setAttribute("stroke-dasharray", circleDasharray);
   }
   function resetTimer() {
       timePassed = 0;
       timeLeft = TIME_LIMIT;
       clearInterval(timerInterval);
       setCircleDasharray();
       setRemainingPathColor(timeLeft);
       document.getElementById("base-timer-label").innerHTML = formatTime(
         timeLeft
       );
       document
       .getElementById("base-timer-path-remaining")
       .classList.remove(COLOR_CODES.alert.color);
     document
       .getElementById("base-timer-path-remaining")
       .classList.remove(COLOR_CODES.warning.color);
     document
       .getElementById("base-timer-path-remaining")
       .classList.add(COLOR_CODES.info.color);
   
       startTimer();
       startTimerSound();
   }
   

var audio = new Audio('audio.mpeg'); // Replace with your own sound file path

function startTimerSound() {
 audio.play();
}
function finishTimer(){
  audio.pause();

}setTimeout(function() {
  finishTimer();
 }, 15000);
 window.onload = function() {
  finishTimer();
 };
 

 document.getElementById('HOME').addEventListener('click', function () {
  window.location.href = "/code/html/quiz.html";
});

  
 //startTimerSound();
 function showCallout() {
  callout.style.display = 'block';
  setTimeout(() => {
      callout.style.display = 'none';
  }, 3000);
}
