// Variables
const checkTerms = document.getElementById('privacyDoc');
const startBtn = document.getElementById('startBtn');
const slides = document.querySelectorAll('.slide');

const nextBtns = document.querySelectorAll('#nextBtn');
const submitButton = document.querySelectorAll('#endBtn');

let currentSlide = 0;
let numAnswers = 0;

function validateTerms(){
    checkTerms.addEventListener('change', () => {
        if (checkTerms.checked){
            startBtn.classList.remove('disabled');
            startBtn.removeAttribute('disabled');
        }
        else{
            startBtn.classList.add('disabled');
            startBtn.setAttribute('disabled', 'true');
        }
    });
}

function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;

    console.log(currentSlide);
    
    if(currentSlide === slides.length-1){
        submitButton.forEach(button => {
            button.style.display = 'inline-block';
        });
        nextBtns.forEach(button => {
            button.style.display = 'none';
        });
    }
    else{
        submitButton.forEach(button => {
            button.style.display = 'none';
        });
        nextBtns.forEach(button => {
            button.style.display = 'inline-block';
        });
    }
}

function nextSlide(numAnswers){
    if(checkTerms.checked){
        showSlide(currentSlide + 1);
    }
    else{
        validateTerms();
    }
}

// Events
startBtn.addEventListener('click', nextSlide(numAnswers));
nextBtns.forEach(button => {
    button.addEventListener('click', nextSlide(numAnswers + 1));
});