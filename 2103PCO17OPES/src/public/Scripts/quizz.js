// Variables
const checkTerms = document.getElementById('privacyDoc');
const startBtn = document.getElementById('startBtn');
const slides = document.querySelectorAll('.slide');

const nextBtns = document.querySelectorAll('#nextBtn');
const submitButton = document.querySelectorAll('#endBtn');

const rate1 = document.getElementById('rate-1');
const rate2 = document.getElementById('rate-2');
const rate3 = document.getElementById('rate-3');
const rate4 = document.getElementById('rate-4');
const rate5 = document.getElementById('rate-5');

const rowSeason = document.getElementById('reaction');

let currentSlide = 0;

function validateTerms(){
  if (checkTerms.checked){
    startBtn.classList.remove('disabled');
    startBtn.removeAttribute('disabled');
  }
  else{
    startBtn.classList.add('disabled');
    startBtn.setAttribute('disabled', 'true');
  }
}

function addReaction(number){
  reactions = {
    1: {
      url: '../Images/superbad.svg',
      text: 'NECESITA MEJORAR MUCHO'
    },
    2: {
      url: '../Images/bad.svg',
      text: 'TIENE ALGUNAS FALLAS'
    },
    3: {
      url: '../Images/regular.svg',
      text: 'NI BIEN NI MAL'
    },
    4: {
      url: '../Images/good.svg',
      text: 'ES BUENO'
    },
    5: {
      url: '../Images/excellent.svg',
      text: '¡DE LO MEJOR!'
    }
  }

  rowSeason.innerHTML = `
    <img src=${reactions[number]['url']} alt='emoji reaction'/>
    <h3>${reactions[number]['text']}</h3>
  `;
}

function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    
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

function nextSlide(){
  showSlide(currentSlide + 1);
}

// Events
startBtn.addEventListener('click', nextSlide);
checkTerms.addEventListener('change', validateTerms, true);
nextBtns.forEach(button => {
    button.addEventListener('click', nextSlide);
});

rate1.addEventListener('change', addReaction(1));
rate2.addEventListener('change', addReaction(2));
rate3.addEventListener('change', addReaction(3));
rate4.addEventListener('change', addReaction(4));
rate5.addEventListener('change', addReaction(5));