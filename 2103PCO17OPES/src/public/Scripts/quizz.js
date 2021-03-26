(function(){

    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "¿Qué tanto te gustaron tus bebidas?",
        answers: {
          a: "SUPER COOL",
          b: "MÁS O MENOS",
          c: "MEDIO CHAFA",
          d: "NO ME LATIÓ"
        }
      },
      {
        question: "¿Tardaron mucho en entregar tu pedido?",
        answers: {
            a: "SUPER COOL",
            b: "MÁS O MENOS",
            c: "MEDIO CHAFA",
            d: "NO ME LATIÓ"
        }
      },
      {
        question: "¿Te atendieron bien?",
        answers: {
            a: "SUPER COOL",
            b: "MÁS O MENOS",
            c: "MEDIO CHAFA",
            d: "NO ME LATIÓ"
        }
      },
      {
        question: "¿Recomendarías a Cassava Roots?",
        answers: {
            a: "SUPER COOL",
            b: "MÁS O MENOS",
            c: "MEDIO CHAFA",
            d: "NO ME LATIÓ"
        }
      }
    ];
    
    function showNextSlide() {
        showSlide(currentSlide + 1);
        //console.log("MENSAJE");
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

    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    
  
    // Kick things off
    buildQuiz();

    // Pagination
    const nextButton = document.getElementById("btn-next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    showSlide(currentSlide)

    // Event listeners
    submitButton.addEventListener('click', showResults);
    nextButton.addEventListener("click", showNextSlide);
  })();