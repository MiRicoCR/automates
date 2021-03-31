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

const checkCommentCasava = document.getElementById('commentCassava');
const checkCommentAtencion = document.getElementById('commentAtencion');
const checkCommentTiempo = document.getElementById('commentTiempo');
const checkCommentBebida = document.getElementById('commentBebida');

const endBtnFinal = document.getElementById('endBtnFinal');

const allButtons = document.querySelectorAll('.movButton');
allButtons.forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
  })
});

let bebidaRds = document.forms["formFinal"].elements["Bebida"];
let atencionRds = document.forms["formFinal"].elements["Atencion"]
let tiempoRds = document.forms["formFinal"].elements["Tiempo"]
let rateRds = document.forms["formFinal"].elements["Rate"]

let nextBtnBebida = document.getElementsByName('next1')[0];
let nextBtnAtencion = document.getElementsByName('next2')[0];
let nextBtnTiempo = document.getElementsByName('next3')[0];
let nextBtnCassava = document.getElementsByName('next4')[0];

let currentSlide = 0;

let numAnswers = 0;

// Bebida
const rdsBebida = document.getElementsByName('Bebida');
const iptBebida = document.getElementById('txtDescBebida');

// Atención
const rdsAtencion = document.getElementsByName('Atencion');
const iptAtencion = document.getElementById('txtDescAtencion');

// Tiempo
const rdsTiempo = document.getElementsByName('Tiempo');
const iptTiempo = document.getElementById('txtDescTiempo');

// Rating
const rdsRate = document.getElementsByName('Rate');
const iptRate = document.getElementById('txtDescCassava');

// Customer Data
const iptName = document.getElementById('txtName');
const iptEmail = document.getElementById('email');

function joinData(){
  let bebida = "";
  let bebidaComment;
  let atencion = "";
  let atencionComment;
  let tiempo = "";
  let tiempoComment;
  let rate = "";
  let rateComment;
  let customerName = "";
  let customerEmail = "";

  rdsBebida.forEach(radio => {
    if(radio.checked){
      bebida = radio.value;
    }
  });
  bebidaComment = (iptBebida.value != '') ? iptBebida.value : "Sin comentarios";

  rdsAtencion.forEach(radio => {
    if(radio.checked){
      atencion = radio.value;
    }
  });
  atencionComment = (iptAtencion.value != '') ? iptAtencion.value : "Sin comentarios";
  
  rdsTiempo.forEach(radio => {
    if(radio.checked){
      tiempo = radio.value;
    }
  });
  tiempoComment = (iptTiempo.value != '') ? iptTiempo.value : "Sin comentarios";

  rdsRate.forEach(radio => {
    if(radio.checked){
      rate = radio.value;
    }
  });
  rateComment = (iptRate.value != '') ? iptRate.value : "Sin comentarios";
  
  customerName = (iptName.value) ? iptName.value : "Anónimo";
  customerEmail = (iptEmail.value) ? iptEmail.value : "Anónimo";

  let colData = {
    'Bebida': {
      'number': bebida,
      'comment': bebidaComment
    },
    'Atencion': {
      'number': atencion,
      'comment': atencionComment
    },
    'Tiempo': {
      'number': tiempo,
      'comment': tiempoComment
    },
    'Rate': {
      'number': rate,
      'comment': rateComment
    },
    'Customer': {
      'name': customerName,
      'email': customerEmail
    }
  };

  console.log(colData);

  return colData;
}

const formAns = document.getElementById('formFinal');

function sendAnswers(){
  
}



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

  console.log(number);
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

function showInput(input, origin){
  box = document.getElementById(`txtDesc${input}`);
  if(origin.checked){
    box.classList.remove('hiden');
  }
  else{
    box.classList.add('hiden');
  }
}

// Events
startBtn.addEventListener('click', nextSlide);
checkTerms.addEventListener('change', validateTerms, true);
nextBtns.forEach(button => {
    button.addEventListener('click', nextSlide);
});

checkCommentCasava.addEventListener('change', () => {showInput('Cassava', checkCommentCasava)});
checkCommentAtencion.addEventListener('change', () => {showInput('Atencion', checkCommentAtencion)});
checkCommentTiempo.addEventListener('change', () => {showInput('Tiempo', checkCommentTiempo)});
checkCommentBebida.addEventListener('change', () => {showInput('Bebida', checkCommentBebida)});

rate1.addEventListener('click', () =>{addReaction(1)});
rate2.addEventListener('click', () =>{addReaction(2)});
rate3.addEventListener('click', () =>{addReaction(3)});
rate4.addEventListener('click', () =>{addReaction(4)});
rate5.addEventListener('click', () =>{addReaction(5)});


function switchButton(name){
  if(name == "Bebida"){
    alert("click");
  }
  else if(name == "Atencion"){

  }
  else if(name == "Tiempo"){

  }
  else if(name == "Rate"){

  }
}

bebidaRds.forEach(radio => {
  radio.onclick = () => {
    nextBtnBebida.classList.remove('disabled');
    nextBtnBebida.removeAttribute('disabled');
  };
});

atencionRds.forEach(radio => {
  radio.onclick = () => {
    nextBtnAtencion.classList.remove('disabled');
    nextBtnAtencion.removeAttribute('disabled');
  };
});

tiempoRds.forEach(radio => {
  radio.onclick = () => {
    nextBtnTiempo.classList.remove('disabled');
    nextBtnTiempo.removeAttribute('disabled');
  };
});

rateRds.forEach(radio => {
  radio.onclick = () => {
    nextBtnCassava.classList.remove('disabled');
    nextBtnCassava.removeAttribute('disabled');
  };
});

let mensaje;

//endBtnFinal.addEventListener('click', sendAnswers, false);
endBtnFinal.addEventListener('click', async (event) => {
  event.preventDefault();

  let formData = new FormData(formAns);
  let data = joinData();
  let params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  };
  let url = '/reward';

  await fetch('https://localhost:1337/reward', params).then(function(response) {return response.json();}).then(function(jsonData) {
    console.log(jsonData['data']);
    window.location.href = `https://localhost:1337/${jsonData['data']}`;
  });
});