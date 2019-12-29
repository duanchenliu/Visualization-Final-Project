(function() {

    function buildQuiz() {
      // let answer_holder = document.getElementById("answer-holder");
      //     answer_holder.display="none";
      
      // we'll need a place to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        const answers = [];
  
        // and for each available answer...
        for (letter in currentQuestion.answers) {
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>&nbsp&nbsp&nbsp&nbsp`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
        );
      });
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("");
    }
  
    function showResults() {
      document.getElementById('submit').style.display='none';
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll(".answers");
      // // keep track of user's answers
      // let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        if(answerContainers[questionNumber].length > 3){
          answerContainers[questionNumber].remove();
        }

        // if answer is correct
        if (userAnswer == currentQuestion.correctAnswer) {
          answerContainers[questionNumber].style.color = "lightgreen";
          
          answerContainers[questionNumber].append("Your answer is CORRECT!");
        } else{
          answerContainers[questionNumber].style.color = "red";
          answerContainers[questionNumber].append("Your answer is WRONG");
        }
      });
  
      
      // // show number of correct answers out of total
      // if (answer_holder.style.display==="none"){
      //   answer_holder.style.display="block";
      // }
  
  
      document.getElementById("explain1").innerHTML = `<br>Explanations: <br>1. Afghanistan indeed has a high number of 
      deaths due to terrorism (more than 8000), however, according to our dataset, 
      Iraq is the country with the highest number of deaths (more than 22400)   
      `
      document.getElementById("explain2").innerHTML =`2. Although the second weapon related to highest death rate are from the category 
      “vehicle”, in June of 2014, The Salahuddin Campaign was an armed conflict where 
      several factions fought against the Islamic State of Iraq and the Levant, leaving
       more than 1500 victims. `
       document.getElementById("explain3").innerHTML =`3. All information is correct despite the fact that the Rwandan Genocide left more than 1100 deaths behind.`
        document.getElementById("explain4").innerHTML =`4. The three most used weapons, in order, are of the category “explosives”, “firearms” and “incendiary <br><br>`;


    }
  


    
    const quizContainer = document.getElementById("quiz");
    // const resultsContainer = document.getElementById("explain");
    const submitButton = document.getElementById("submit");
    const myQuestions = [
      {
        question: "The most dangerous country - in terms of total deaths due to terrorism - is Afghanistan",
        answers: {
          a: "True",
          b: "False"
        },
        correctAnswer: "a"
      },
      {
        question: "The weapon that have caused the biggest number of deaths in a terrorist attack was from the category “vehicle”, such as airplanes - in 2001 - and trucks",
        answers: {
          a: "True",
          b: "False"
        },
        correctAnswer: "b"
      },
      {
        question: "The Rwandan Genocide that happened in 1994 culminated in more than 200 deaths due to the mass slaughter of Tutsi, Twa and Hutu (ethnic group)",
        answers: {
          a: "True",
          b: "False"
        },
        correctAnswer: "b"
      },
      {
        question: "The most used weapon in attacks between 1970 and 2018 are of the category explosives",
        answers: {
          a: "True",
          b: "False"
        },
        correctAnswer: "a"
      }
    ];
  
    // display quiz right away
    buildQuiz();
  
    // on submit, show results
    submitButton.addEventListener("click", showResults);
  })();