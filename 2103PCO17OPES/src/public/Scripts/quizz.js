(function(){

    function test(){
      alert("HOLAAA");
    }

    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          
          /*
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label class="custom-radio rd${letter}"><input type="radio" name="question${questionNumber}" value="${letter}"><span class="radio-btn"><img src="${currentQuestion.answers[letter][0]}"/><p id="form-sense">${currentQuestion.answers[letter][1]}</p></span></label>`
            );
            
          }
          
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
                <div class="question"><h3>${currentQuestion.question}</h3></div>
                <div class="answers"> ${answers.join('')} </div>
            </div>`
          );
          */
         output.push(`
            <div class="slide">
                <div class="question"><h3>${currentQuestion.question}</h3></div>
                <div class="answers">
                  <div class="frow">
                    <label class="custom-radio">
                        <input type="radio" name="question${questionNumber}" value="excelente">
                        <span class="radio-btn">
                            <img src="/Images/excelente.png"/>
                            <p id="form-sense">SUPER COOL</p>
                        </span>
                    </label>
                    <label class="custom-radio">
                        <input type="radio" name="question${questionNumber}" value="bueno">
                        <span class="radio-btn">
                            <img src="/Images/bien.png"/>
                            <p id="form-sense">MÁS O MENOS</p>
                        </span>
                    </label>
                  </div>
                  <div class="srow">
                    <label class="custom-radio">
                        <input type="radio" name="question${questionNumber}" value="regular">
                        <span class="radio-btn">
                            <img src="/Images/regular.png"/>
                            <p id="form-sense">MEDIO CHAFA</p>
                        </span>
                    </label>
                    <label class="custom-radio">
                        <input type="radio" name="question${questionNumber}" value="mal">
                        <span class="radio-btn">
                            <img src="/Images/mal.png"/>
                            <p id="form-sense">NO ME LATIÓ</p>
                        </span>
                    </label>
                  </div>
                </div>
            </div>
         `);
        }
      );

      output.push(`
            <div class="slide">
                <div class="question"><h3>¿Recomendarías a Cassava Roots?</h3></div>
                <div class="answers-rate">
                  <div class="frow-rate">
                    <label class="custom-rate">
                        <input type="radio" name="1" value="1">
                        <span class="rate-btn">
                            <img src="/Images/norate.svg"/>
                        </span>
                    </label>
                    <label class="custom-rate">
                        <input type="radio" name="2" value="2">
                        <span class="rate-btn">
                            <img src="/Images/norate.svg"/>
                        </span>
                    </label>
                    <label class="custom-rate">
                        <input type="radio" name="3" value="3">
                        <span class="rate-btn">
                            <img src="/Images/norate.svg"/>
                        </span>
                    </label>
                    <label class="custom-rate">
                        <input type="radio" name="4" value="4">
                        <span class="rate-btn">
                            <img src="/Images/norate.svg"/>
                        </span>
                    </label>
                    <label class="custom-rate">
                        <input type="radio" name="5" value="5">
                        <span class="rate-btn">
                            <img src="/Images/norate.svg"/>
                        </span>
                    </label>
                  </div>
                </div>
            </div>
        `);
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }

    function showResults(){

      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if(currentSlide === 0){
          previousButton.style.display = 'none';
        }
        else{
          previousButton.style.display = 'inline-block';
        }
        if(currentSlide === slides.length-1){
          nextButton.style.display = 'none';
          submitButton.style.display = 'inline-block';
        }
        else{
          nextButton.style.display = 'inline-block';
          submitButton.style.display = 'none';
        }
    }

    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }

    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "¿Qué tanto te gustaron tus bebidas?",
        answers: {
          Excelente: ["/Images/excelente.png", "EXCELENTE"],
          Bueno: ["/Images/bien.png", "BUENO"],
          Regular: ["/Images/regular.png", "REGULAR"],
          Mal: ["/Images/mal.png", "MALO"]
        }
      },
      {
        question: "¿Tardaron mucho en entregar tu pedido?",
        answers: {
          Excelente: ["/Images/excelente.png", "EXCELENTE"],
          Bueno: ["/Images/bien.png", "BUENO"],
          Regular: ["/Images/regular.png", "REGULAR"],
          Mal: ["/Images/mal.png", "MALO"]
        }
      },
      {
        question: "¿Te atendieron bien?",
        answers: {
          Excelente: ["/Images/excelente.png", "EXCELENTE"],
          Bueno: ["/Images/bien.png", "BUENO"],
          Regular: ["/Images/regular.png", "REGULAR"],
          Mal: ["/Images/mal.png", "MALO"]
        }
      }
    ];
  
    // Kick things off
    buildQuiz();

    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("btnNext");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    showSlide(currentSlide);

    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();